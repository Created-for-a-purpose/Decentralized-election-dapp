import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import Election from './contracts/election.json';

function App() {

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);

  useEffect(()=>{
    const init = async () => {
      try {
        // Connect to MetaMask
        if (typeof window.ethereum !== 'undefined') {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccounts(accounts);

          // Load the contract
          const contractAddress = "0xE019D3717612C3CED7788dC3Ed42CE84F7b3C32E";
          const electionInstance = new web3Instance.eth.Contract(
            Election.abi,
            contractAddress
          );

           setContract(electionInstance);
         
          getCandidates();

        } else {
          console.log('Please install MetaMask to use this application.');
        }
      } catch (error) {
        console.error('Error initializing the application:', error);
      }
    };

     init();

  }, [contract]);

  const getCandidates = async () => {
    try {
      // console.log("contract:", contract)
      let candidates = [];
     
      if(contract!==null){

          let candidate = await contract.methods.getCandidates().call();
          candidates = [...candidate];
      }

      setCandidates(candidates);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const vote = async(event, i)=>{
    event.preventDefault();
    // console.log(typeof accounts[0])
    await contract.methods.vote(i).send({from: accounts[0]});
    getCandidates();
  }

  return (
    
      <div align="center">
        <h1>Decentralized Presidential Elections 2023</h1>
        <hr />
        <h1><u>Candidates:</u></h1>
        <ul>
          {candidates.map((item, index)=>{
              return(
               <h2><li>{index+1}. {item.name} 
               <button onClick={event=>vote(event, index)}>Vote!</button> Votes:{item.votes}</li>
               </h2>
              );
          })}
        </ul>
        <hr />
        <h3>Connected account: {accounts[0]}</h3>
      </div>
    
  );
}

export default App;

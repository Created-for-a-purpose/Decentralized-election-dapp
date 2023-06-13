// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;

contract election{

  struct candidate{
    uint votes;
    string name;
  }

  candidate[3] candidates;

  constructor() public{
       candidates[0] = candidate(0, "Trump");
        candidates[1] = candidate(0, "Modi");
       candidates[2] = candidate(0, "Putin");
  }

  function vote(uint i) public {
    candidates[i].votes=(candidates[i].votes)+1;
  } 
  
  function getCandidates() public view returns(candidate[3] memory){
    return candidates;
  }
}

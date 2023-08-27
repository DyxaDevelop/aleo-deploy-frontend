# Aleo Voting Program

## Overview

This Aleo smart contract implements a voting system for proposals. It enables users to propose ideas, vote on proposals, and keep track of votes using blockchain technology. The contract provides mechanisms for proposal creation, ticket issuance, voting, and result tracking.

## Data Structures

1. **`ProposalInfo`**:
   - Fields:
     - `title` (field): Title of the proposal.
     - `content` (field): Content or description of the proposal.
     - `proposer` (address): Address of the proposal's creator.
     - `gitine` (u128): Deadline for voting, expressed as a block height.

2. **`record Proposal`**:
   - Fields:
     - `owner` (private address): Owner of the proposal.
     - `id` (private field): Identifier of the proposal.
     - `info` (private ProposalInfo): Information about the proposal.

3. **`record Ticket`**:
   - Fields:
     - `owner` (private address): Owner of the ticket.
     - `pid` (private field): Identifier of the associated proposal.

## Mappings

1. **`proposals`**:
   - Maps proposal IDs to ProposalInfo.
   - Key: Proposal ID (public field)
   - Value: ProposalInfo (public).

2. **`tickets`**:
   - Maps proposal IDs to the number of tickets issued for each proposal.
   - Key: Proposal ID (public field)
   - Value: Number of tickets (public u64).

3. **`agree_votes`**:
   - Maps proposal IDs to the number of agree votes received.
   - Key: Proposal ID (public field)
   - Value: Number of agree votes (public u64).

4. **`disagree_votes`**:
   - Maps proposal IDs to the number of disagree votes received.
   - Key: Proposal ID (public field)
   - Value: Number of disagree votes (public u64).

## Functions

1. **`propose`**:
   - Creates a new proposal.
   - Inputs: `r0` (ProposalInfo.public).
   - Finalizes the proposal creation, ensuring proper authorization and returning a Proposal record.

2. **`new_ticket`**:
   - Issues a new voting ticket for a proposal.
   - Inputs: `r0` (public proposal ID), `r1` (public address).
   - Finalizes the ticket issuance.

3. **`agree`**:
   - Registers an agree vote for a proposal.
   - Inputs: `r0` (Ticket.record), `r1` (private u128).
   - Finalizes the agree vote, considering proposal deadlines.

4. **`disagree`**:
   - Registers a disagree vote for a proposal.
   - Inputs: `r0` (Ticket.record), `r1` (private u128).
   - Finalizes the disagree vote, considering proposal deadlines.

## Details

- Users can propose ideas, create tickets, and vote on proposals.
- The `finalize` keyword is used to conclude operations and ensure conditions are met.
- The contract enforces voting deadlines and ensures proper user authorization.
- Votes are tracked separately for agree and disagree votes.
- The contract utilizes mappings to manage proposals, tickets, and vote counts.

## Use Case

This smart contract serves as a secure and transparent voting mechanism for proposals. It can be utilized for decision-making in organizations, communities, or platforms where user participation and consensus are crucial.

---

*Note: This README-style description provides an overview of the smart contract's purpose, data structures, functions, and their interactions. For comprehensive understanding and implementation details, refer to the contract's original documentation and accompanying materials.*

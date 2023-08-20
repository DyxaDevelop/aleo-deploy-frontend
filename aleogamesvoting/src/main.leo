// The 'aleogamesvoting.aleo' program.

// The contract will take snapshots of holders of the government token "AleoGames" (aleogamestoken.aleo).
// The number of tokens held by each address will determine their voting power.

// In this context:

// "Snapshots of holders" refers to capturing the token balances of all addresses at a specific point in time.

// "Government token" refers to the token named "AleoGames" with the contract address "aleogamestoken.aleo."

// "Voting power" refers to the influence or weight each address has in the voting process, which is determined
// based on the number of "AleoGames" tokens they hold.

// The contract will likely use the token balances to calculate the voting power of each address during the 
// voting process, allowing participants to vote according to their holdings of "AleoGames" tokens.

program aleogamesvoting.aleo {
    // Proposal details
    struct ProposalInfo {
        title: field,
        content: field,
        proposer: address,
        deadline: u128,  // unix timestamp that determines proposal voting finish time
    }

    // Proposal record records proposal info publicly
    record Proposal {
        owner: address,
        id: field,
        info: ProposalInfo,
    }

    // Save proposal info in public storage.
    mapping proposals: field => ProposalInfo;

    // Privacy tickets to vote
    record Ticket {
        owner: address,
        pid: field,
    }

    // Count the total tickets issued for each proposal
    mapping tickets: field => u64;

    mapping agree_votes: field => u64;

    mapping disagree_votes: field => u64;

    // Propose a new proposal to vote on.
    transition propose(public info: ProposalInfo) -> Proposal {
        // Only owner has permissions to propose
        assert_eq(self.caller, aleo1492w2vfw7djqcf7drkfk6t2u0csdn4jctxvf2lxs4ck3ktazc5gqyx2f2d);

        // Authenticate proposer.
        assert_eq(self.caller, info.proposer);

        // Generate a new proposal id.
        let id: field = BHP256::hash_to_field(info.title);


        // Return a new record for the proposal.
        // Finalize the proposal id.
        return Proposal {
            owner: self.caller,
            id,
            info,
        } then finalize(id);
    }
    // Create a new proposal in the "tickets" mapping.
    finalize propose(public id: field) {
        Mapping::set(tickets, id, 0u64);
    }

    // Create a new ticket to vote with.
    transition new_ticket(
        public pid: field,
        public voter: address,
    ) -> Ticket {
        // Only owner can create tickers for wallets from snapshot
        assert_eq(self.caller, aleo1492w2vfw7djqcf7drkfk6t2u0csdn4jctxvf2lxs4ck3ktazc5gqyx2f2d);

        // Finalize the proposal id for the ticket.
        return Ticket {
            owner: voter,
            pid,
        } then finalize(pid);
    }

    // Create a new ticket on a proposal in the "tickets" mapping.
    finalize new_ticket(public pid: field) {
        let current: u64 = Mapping::get_or_use(tickets, pid, 0u64);
        Mapping::set(tickets, pid, current + 1u64);
    }

    // Vote privately to agree with a proposal.
    transition agree(ticket: Ticket, timestamp: u128) {
        // Finalize this vote.
        return then finalize(ticket.pid, timestamp);
    }
    finalize agree(public pid: field, timestamp: u128) {
        let proposal: ProposalInfo = Mapping::get(proposals, pid);
        // Check if prposal is still active
        assert_eq(proposal.deadline < timestamp, true);
        // Publicly increment the number of agree votes.
        let current: u64 = Mapping::get_or_use(agree_votes, pid, 0u64);
        Mapping::set(agree_votes, pid, current + 1u64);
    }

    // Vote privately to disagree with a proposal.
    transition disagree(ticket: Ticket, timestamp: u128) {
        // Finalize this vote.
        return then finalize(ticket.pid, timestamp);
    }
    finalize disagree(pid: field, timestamp: u128) {
        let proposal: ProposalInfo = Mapping::get(proposals, pid);
        // Check if prposal is still active    
        assert_eq(proposal.deadline < timestamp, true);
        
        // Publicly increment the number of disagree votes.
        let current: u64 = Mapping::get_or_use(disagree_votes, pid, 0u64);
        Mapping::set(disagree_votes, pid, current + 1u64);
    }
}
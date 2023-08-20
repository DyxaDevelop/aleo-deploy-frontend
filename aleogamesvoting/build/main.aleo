program aleogamesvoting.aleo;

struct ProposalInfo:
    title as field;
    content as field;
    proposer as address;
    deadline as u128;

record Proposal:
    owner as address.private;
    id as field.private;
    info as ProposalInfo.private;

record Ticket:
    owner as address.private;
    pid as field.private;


mapping proposals:
	key left as field.public;
	value right as ProposalInfo.public;


mapping tickets:
	key left as field.public;
	value right as u64.public;


mapping agree_votes:
	key left as field.public;
	value right as u64.public;


mapping disagree_votes:
	key left as field.public;
	value right as u64.public;

function propose:
    input r0 as ProposalInfo.public;
    assert.eq self.caller aleo1492w2vfw7djqcf7drkfk6t2u0csdn4jctxvf2lxs4ck3ktazc5gqyx2f2d;
    assert.eq self.caller r0.proposer;
    hash.bhp256 r0.title into r1 as field;    cast self.caller r1 r0 into r2 as Proposal.record;
    output r2 as Proposal.record;

    finalize r1;

finalize propose:
    input r0 as field.public;
    set 0u64 into tickets[r0];


function new_ticket:
    input r0 as field.public;
    input r1 as address.public;
    assert.eq self.caller aleo1492w2vfw7djqcf7drkfk6t2u0csdn4jctxvf2lxs4ck3ktazc5gqyx2f2d;
    cast r1 r0 into r2 as Ticket.record;
    output r2 as Ticket.record;

    finalize r0;

finalize new_ticket:
    input r0 as field.public;
    get.or_use tickets[r0] 0u64 into r1;
    add r1 1u64 into r2;
    set r2 into tickets[r0];


function agree:
    input r0 as Ticket.record;
    input r1 as u128.private;

    finalize r0.pid r1;

finalize agree:
    input r0 as field.public;
    input r1 as u128.public;
    get proposals[r0] into r2;
    lt r2.deadline r1 into r3;
    assert.eq r3 true;
    get.or_use agree_votes[r0] 0u64 into r4;
    add r4 1u64 into r5;
    set r5 into agree_votes[r0];


function disagree:
    input r0 as Ticket.record;
    input r1 as u128.private;

    finalize r0.pid r1;

finalize disagree:
    input r0 as field.public;
    input r1 as u128.public;
    get proposals[r0] into r2;
    lt r2.deadline r1 into r3;
    assert.eq r3 true;
    get.or_use disagree_votes[r0] 0u64 into r4;
    add r4 1u64 into r5;
    set r5 into disagree_votes[r0];

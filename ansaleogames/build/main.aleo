program ansaleogames.aleo;

struct TokenId:
    data1 as u128;
    data2 as u128;

struct BaseURI:
    data0 as u128;
    data1 as u128;
    data2 as u128;
    data3 as u128;

struct SymbolBits:
    data as u128;

record ANS:
    owner as address.private;
    data as TokenId.private;
    edition as scalar.private;

record ANS_mint:
    owner as address.private;
    amount as u8.private;

record ANS_claim:
    owner as address.private;
    claim as field.private;

record ANS_ownership:
    owner as address.private;
    ans_owner as address.private;
    data as TokenId.private;
    edition as scalar.private;


mapping ans_owners:
	key left as field.public;
	value right as address.public;


mapping general_settings:
	key left as u8.public;
	value right as u128.public;


mapping toggle_settings:
	key left as u8.public;
	value right as u32.public;


mapping claims_to_anses:
	key left as field.public;
	value right as field.public;

function initialize_ans:
    input r0 as u128.public;
    input r1 as BaseURI.public;
    assert.eq self.caller aleo1492w2vfw7djqcf7drkfk6t2u0csdn4jctxvf2lxs4ck3ktazc5gqyx2f2d;

    finalize r0 r1;

finalize initialize_ans:
    input r0 as u128.public;
    input r1 as BaseURI.public;
    get.or_use toggle_settings[0u8] 0u32 into r2;
    and r2 1u32 into r3;
    assert.eq r3 0u32;
    set r0 into general_settings[1u8];
    set r1.data0 into general_settings[2u8];
    set r1.data1 into general_settings[3u8];
    set r1.data2 into general_settings[4u8];
    set r1.data3 into general_settings[5u8];
    set 5u32 into toggle_settings[0u8];
    set 0u32 into toggle_settings[1u8];


function mint_ans:
    input r0 as TokenId.public;
    input r1 as scalar.public;
    hash.bhp256 r0 into r2 as field;    commit.bhp256 r2 r1 into r3 as field;
    finalize r3;

finalize mint_ans:
    input r0 as field.public;
    get toggle_settings[0u8] into r1;
    and r1 1u32 into r2;
    assert.eq r2 1u32;


function update_toggle_settings:
    input r0 as u32.public;
    assert.eq self.caller aleo1492w2vfw7djqcf7drkfk6t2u0csdn4jctxvf2lxs4ck3ktazc5gqyx2f2d;

    finalize r0;

finalize update_toggle_settings:
    input r0 as u32.public;
    get toggle_settings[0u8] into r1;
    and r1 9u32 into r2;
    assert.eq r2 1u32;
    and r0 1u32 into r3;
    assert.eq r3 1u32;
    set r0 into toggle_settings[0u8];


function set_mint_block:
    input r0 as u32.public;
    assert.eq self.caller aleo1492w2vfw7djqcf7drkfk6t2u0csdn4jctxvf2lxs4ck3ktazc5gqyx2f2d;

    finalize r0;

finalize set_mint_block:
    input r0 as u32.public;
    get toggle_settings[0u8] into r1;
    and r1 1u32 into r2;
    assert.eq r2 1u32;
    set r0 into toggle_settings[1u8];


function update_symbol:
    input r0 as u128.public;
    assert.eq self.caller aleo1492w2vfw7djqcf7drkfk6t2u0csdn4jctxvf2lxs4ck3ktazc5gqyx2f2d;

    finalize r0;

finalize update_symbol:
    input r0 as u128.public;
    get toggle_settings[0u8] into r1;
    and r1 1u32 into r2;
    assert.eq r2 1u32;
    set r0 into general_settings[1u8];


function update_base_uri:
    input r0 as BaseURI.public;
    assert.eq self.caller aleo1492w2vfw7djqcf7drkfk6t2u0csdn4jctxvf2lxs4ck3ktazc5gqyx2f2d;

    finalize r0;

finalize update_base_uri:
    input r0 as BaseURI.public;
    get toggle_settings[0u8] into r1;
    and r1 1u32 into r2;
    assert.eq r2 1u32;
    set r0.data0 into general_settings[2u8];
    set r0.data1 into general_settings[3u8];
    set r0.data2 into general_settings[4u8];
    set r0.data3 into general_settings[5u8];


function mint:
    input r0 as ANS_mint.record;
    input r1 as scalar.private;
    hash.bhp256 self.caller into r2 as field;    commit.bhp256 r2 r1 into r3 as field;    sub r0.amount 1u8 into r4;
    cast r0.owner r4 into r5 as ANS_mint.record;
    cast r0.owner r3 into r6 as ANS_claim.record;
    output r5 as ANS_mint.record;
    output r6 as ANS_claim.record;

    finalize r3 self.caller;

finalize mint:
    input r0 as field.public;
    input r1 as address.public;
    get toggle_settings[1u8] into r2;
    lte r2 block.height into r3;
    assert.eq r3 true;
    get toggle_settings[0u8] into r4;
    and r4 11u32 into r5;
    assert.eq r5 3u32;
    set r1 into ans_owners[r0];


function claim_ans:
    input r0 as ANS_claim.record;
    input r1 as TokenId.private;
    input r2 as scalar.private;
    hash.bhp256 r1 into r3 as field;    commit.bhp256 r3 r2 into r4 as field;    cast r0.owner r1 r2 into r5 as ANS.record;
    output r5 as ANS.record;

    finalize r0.claim r4;

finalize claim_ans:
    input r0 as field.public;
    input r1 as field.public;
    get claims_to_anses[r0] into r2;
    assert.eq r2 r1;
    set 0field into claims_to_anses[r0];


function transfer_private:
    input r0 as ANS.record;
    input r1 as address.private;
    cast r1 r0.data r0.edition into r2 as ANS.record;
    output r2 as ANS.record;


function transfer_public:
    input r0 as address.private;
    input r1 as TokenId.private;
    input r2 as scalar.private;
    hash.bhp256 r1 into r3 as field;    commit.bhp256 r3 r2 into r4 as field;
    finalize r0 r4 self.caller;

finalize transfer_public:
    input r0 as address.public;
    input r1 as field.public;
    input r2 as address.public;
    get ans_owners[r1] into r3;
    assert.eq r2 r3;
    set r0 into ans_owners[r1];

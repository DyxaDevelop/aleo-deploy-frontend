// The 'ansAleoGames' program.
program ansaleogames.aleo {
    // dummy address, ie the aleo address equivalent of 0: aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc
    struct TokenId {
        data1: u128, // Part 1 of the and name: bits of symbol
        data2: u128,
    }

    // base uri ascii bits. Include as many data pieces as necessary to encapsulate the uri. Padded with 0s at the end.
    struct BaseURI {
        data0: u128, // Part 1 of the base uri in bits. Bits should be the representation of the hexadecimal bytes for the ASCII text of the URL
        data1: u128,
        data2: u128,
        data3: u128
    }

    struct SymbolBits {
        data: u128 // The sybmol's ascii text represented in bits, and the u128 value of the bitstring.
    }

    record ANS {
        private owner: address,
        private data: TokenId,
        private edition: scalar, // which edition of the ans this particular one is -- will be 0 for unique ANSes
    }

    record ANS_mint {
        private owner: address,
        private amount: u8,
    }

    record ANS_claim {
        private owner: address,
        private claim: field
    }

    // a way to prove ownership of an ans privately
    record ANS_ownership {
        private owner: address,
        private ans_owner: address,
        private data: TokenId,
        private edition: scalar, // which edition of the ans this particular one is -- will be 0 for unique ANSes
    }

    mapping ans_owners: field => address;

    // keys: setting index
    // values: setting value
    // 1: symbol of the ans
    // 2, 3, 4, 5: base_uri bits
    mapping general_settings: u8 => u128;

        // keys: just two, 0u8 which corresponds to different on/off settings for the contract, and 1u8
    // which corresponds to the mint block height.
    // values: the bitstring that represents the settings that can be toggled
    // in order of least significant bit index to most significant bit:
    // 0: collection has been initialized
    // 1: can minters mint
    mapping toggle_settings: u8 => u32;


    // keys: fields that represent claims for having minted an ans
    // values: fields that are the hash of the ans that was minted
    mapping claims_to_anses: field => field;


    transition initialize_ans(
      public symbol: u128,
      public base_uri: BaseURI,
    ) {
      assert_eq(self.caller, aleo1492w2vfw7djqcf7drkfk6t2u0csdn4jctxvf2lxs4ck3ktazc5gqyx2f2d);
      return then finalize(symbol, base_uri);
    }

    finalize initialize_ans(
      public symbol: u128,
      public base_uri: BaseURI,
    ) {
      // Ensure initialize cannot be called twice!
      let toggle_settings_status: u32 = toggle_settings.get_or_use(0u8, 0u32);
      let is_initialized: u32 = toggle_settings_status & 1u32;
      assert_eq(is_initialized, 0u32);
      general_settings.set(1u8, symbol); // Symbol for the NFT
      general_settings.set(2u8, base_uri.data0); // Base URI for NFT
      general_settings.set(3u8, base_uri.data1);
      general_settings.set(4u8, base_uri.data2);
      general_settings.set(5u8, base_uri.data3);
      toggle_settings.set(0u8, 5u32);
      toggle_settings.set(1u8, 0u32); // block height when mint is allowed
  }

// Load the data into the mapping
    // Enables someone to mint an ANS with provided image data
    transition mint_ans(public tokenId: TokenId, public edition: scalar) {
        let tokenHash: field = BHP256::hash_to_field(tokenId);
        let tokenEditionHash: field = BHP256::commit_to_field(tokenHash, edition);
        return then finalize(tokenEditionHash);
    }

    finalize mint_ans(public tokenEditionHash: field) {
      // Ensure collection is initialized and not frozen.
      let toggle_settings_status: u32 = toggle_settings.get(0u8);
      let is_initialized_and_not_frozen: u32 = toggle_settings_status & 1u32;
      assert_eq(is_initialized_and_not_frozen, 1u32);
    }

        // call this function to toggle minting, the whitelist requirement, or to permanently freeze the contract
    transition update_toggle_settings(public toggle_settings_bitstring: u32) {
        assert_eq(self.caller, aleo1492w2vfw7djqcf7drkfk6t2u0csdn4jctxvf2lxs4ck3ktazc5gqyx2f2d);
        return then finalize(toggle_settings_bitstring);
    }

    finalize update_toggle_settings(public toggle_settings_bitstring: u32) {
      // Ensure collection is initialized and not frozen.
      let toggle_settings_status: u32 = toggle_settings.get(0u8);
      // initialized & frozen flags = 0b0000...1001 = 9u32
      // what the settings should be = 0b0000...0001 = 1u32
      let is_initialized_and_not_frozen: u32 = toggle_settings_status & 9u32;
      assert_eq(is_initialized_and_not_frozen, 1u32);

      // Ensure updated settings are not uninitializing the collection.
      let still_initialized: u32 = toggle_settings_bitstring & 1u32;
      assert_eq(still_initialized, 1u32);

      toggle_settings.set(0u8, toggle_settings_bitstring);
    }

  transition set_mint_block(public mint_block: u32) {
    assert_eq(self.caller, aleo1492w2vfw7djqcf7drkfk6t2u0csdn4jctxvf2lxs4ck3ktazc5gqyx2f2d);
    return then finalize(mint_block);
  }

  finalize set_mint_block(public mint_block: u32) {
    let toggle_settings_status: u32 = toggle_settings.get(0u8);
    let is_initialized_and_not_frozen: u32 = toggle_settings_status & 1u32;
    assert_eq(is_initialized_and_not_frozen, 1u32);

    toggle_settings.set(1u8, mint_block);
  }

  transition update_symbol(public symbol: u128) {
    assert_eq(self.caller, aleo1492w2vfw7djqcf7drkfk6t2u0csdn4jctxvf2lxs4ck3ktazc5gqyx2f2d);
    return then finalize(symbol);
  }

  finalize update_symbol(public symbol: u128) {
    // Ensure collection is initialized and not frozen.
    let toggle_settings_status: u32 = toggle_settings.get(0u8);
    // initialized & frozen flags = 0b0000...1001 = 9u32
    // what the settings should be = 0b0000...0001 = 1u32
    let is_initialized_and_not_frozen: u32 = toggle_settings_status & 1u32;
    assert_eq(is_initialized_and_not_frozen, 1u32);

    general_settings.set(1u8, symbol);
  }

  transition update_base_uri(public base_uri: BaseURI) {
      assert_eq(self.caller, aleo1492w2vfw7djqcf7drkfk6t2u0csdn4jctxvf2lxs4ck3ktazc5gqyx2f2d);
      return then finalize(base_uri);
  }

  finalize update_base_uri(public base_uri: BaseURI) {
    // Ensure collection is initialized and not frozen.
    let toggle_settings_status: u32 = toggle_settings.get(0u8);
    // initialized & frozen flags = 0b0000...1001 = 9u32
    // what the settings should be = 0b0000...0001 = 1u32
    let is_initialized_and_not_frozen: u32 = toggle_settings_status & 1u32;
    assert_eq(is_initialized_and_not_frozen, 1u32);

    general_settings.set(2u8, base_uri.data0); // Base URI for ANS
    general_settings.set(3u8, base_uri.data1);
    general_settings.set(4u8, base_uri.data2);
    general_settings.set(5u8, base_uri.data3);
  }

  transition mint(ans_mint: ANS_mint, private hiding_nonce: scalar) -> (ANS_mint, ANS_claim) {
    // CAUTION: For security purposes, the hiding nonce should be unique for each mint.
    let address_hash: field = BHP256::hash_to_field(self.caller);
    let claim: field = BHP256::commit_to_field(address_hash, hiding_nonce);
    // overflow protection for minting
    return (
      ANS_mint {
      owner: ans_mint.owner,
      amount: ans_mint.amount - 1u8
    },
      ANS_claim {
        owner: ans_mint.owner,
        claim
      }) then finalize(claim, self.caller);
  }

  finalize mint(public claim: field, public minter: address) {
    // Ensure mint block height is less than current block height
    let mint_block: u32 = toggle_settings.get(1u8);
    let passed_height_check: bool = mint_block <= block.height;
    assert_eq(passed_height_check, true);

    // Ensure collection is not frozen, minting is allowed, and is initialized,
    let toggle_settings_status: u32 = toggle_settings.get(0u8);

    let is_initialized_and_not_frozen_and_minting: u32 = toggle_settings_status & 11u32;
    assert_eq(is_initialized_and_not_frozen_and_minting, 3u32);

    ans_owners.set(claim, minter);
  }

  transition claim_ans(ans_claim: ANS_claim, private tokenId: TokenId, private edition: scalar) -> ANS {
    let tokenHash: field = BHP256::hash_to_field(tokenId);
    let tokenEditionHash: field = BHP256::commit_to_field(tokenHash, edition);
    return ANS {
      owner: ans_claim.owner,
      data: tokenId,
      edition
    } then finalize(ans_claim.claim, tokenEditionHash);
  }

  finalize claim_ans(public claim: field, tokenEditionHash: field) {
    // ensure that the claimed ans matches the claim
    let claimedANS: field = claims_to_anses.get(claim);
    assert_eq(claimedANS, tokenEditionHash);
    claims_to_anses.set(claim, 0field);
  }

  transition transfer_private(
    ans: ANS,
    private receiver: address
  ) -> ANS
  {
    return ANS {
      owner: receiver,
      data: ans.data,
      edition: ans.edition
    };
  }

  transition transfer_public(
    private receiver: address,
    private data: TokenId,
    private edition: scalar
  )
  {
    let tokenHash: field = BHP256::hash_to_field(data);
    let tokenEditionHash: field = BHP256::commit_to_field(tokenHash, edition);
    let caller: address = self.caller;
    return then finalize(receiver, tokenEditionHash, caller);
  }

  finalize transfer_public(
    public receiver: address,
    public tokenEditionHash: field,
    public caller: address
  )
  {
    assert_eq(caller, ans_owners.get(tokenEditionHash));
    ans_owners.set(tokenEditionHash, receiver);
  }
}
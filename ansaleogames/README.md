# ANS Aleo Games Program

## Overview

The ANS (Aleo NFT Standard) Aleo Games Smart Contract introduces a mechanism for managing and minting NFTs (Non-Fungible Tokens) within the context of Aleo Games. It provides features such as minting ANS NFTs, ownership management, and metadata configuration.

## Data Structures

1. **`TokenId`**:
   - Fields:
     - `data1` (u128): First component of the Token ID.
     - `data2` (u128): Second component of the Token ID.

2. **`BaseURI`**:
   - Fields:
     - `data0` to `data3` (u128): Components of the base URI for metadata.

3. **`SymbolBits`**:
   - Fields:
     - `data` (u128): Represents bits for the token symbol.

4. **`record ANS`**:
   - Fields:
     - `owner` (private address): Owner of the ANS NFT.
     - `data` (private TokenId): Token ID data.
     - `edition` (private scalar): Token edition.

5. **`record ANS_mint`**:
   - Fields:
     - `owner` (private address): Owner of the ANS NFT.
     - `amount` (private u8): Amount of ANS NFTs to mint.

6. **`record ANS_claim`**:
   - Fields:
     - `owner` (private address): Owner claiming ANS NFTs.
     - `claim` (private field): Claim data.

7. **`record ANS_ownership`**:
   - Fields:
     - `owner` (private address): Owner of the ANS NFT.
     - `ans_owner` (private address): Owner of the associated ANS.
     - `data` (private TokenId): Token ID data.
     - `edition` (private scalar): Token edition.

## Mappings

1. **`ans_owners`**:
   - Maps Token IDs to ANS NFT owners.
   - Key: Token ID (public field)
   - Value: ANS NFT owner (public address).

2. **`general_settings`**:
   - Maps settings keys to corresponding values.
   - Key: Settings key (public u8)
   - Value: Settings value (public u128).

3. **`toggle_settings`**:
   - Maps toggle settings keys to corresponding values.
   - Key: Toggle settings key (public u8)
   - Value: Toggle settings value (public u32).

4. **`claims_to_anses`**:
   - Maps claim data to associated ANS NFT IDs.
   - Key: Claim data (public field)
   - Value: Associated ANS NFT ID (public field).

## Functions

1. **`initialize_ans`**:
   - Initializes the ANS system.
   - Inputs: `r0` (public u128), `r1` (BaseURI.public).
   - Finalizes the initialization by setting values and ensuring proper authorization.

2. **`mint_ans`**:
   - Mints new ANS NFTs.
   - Inputs: `r0` (TokenId.public), `r1` (scalar.public).
   - Finalizes the minting process, considering toggle settings.

3. **`update_toggle_settings`**:
   - Updates toggle settings.
   - Inputs: `r0` (public u32).
   - Finalizes the settings update, ensuring proper authorization.

4. **`set_mint_block`**:
   - Sets the mint block.
   - Inputs: `r0` (public u32).
   - Finalizes the block setting, ensuring proper authorization.

5. **`update_symbol`**:
   - Updates the token symbol.
   - Inputs: `r0` (public u128).
   - Finalizes the symbol update, ensuring proper authorization.

6. **`update_base_uri`**:
   - Updates the base URI for metadata.
   - Inputs: `r0` (BaseURI.public).
   - Finalizes the base URI update, ensuring proper authorization.

7. **`mint`**:
   - Mints ANS NFTs.
   - Inputs: `r0` (ANS_mint.record), `r1` (scalar.private).
   - Finalizes the minting process, considering toggle settings and available blocks.

8. **`claim_ans`**:
   - Claims ANS NFTs.
   - Inputs: `r0` (ANS_claim.record), `r1` (TokenId.private), `r2` (scalar.private).
   - Finalizes the claiming process, associating ANS NFTs and clearing claims.

9. **`transfer_private`**:
   - Transfers ANS NFTs between private addresses.
   - Inputs: `r0` (ANS.record), `r1` (address.private).
   - Outputs the transferred ANS record.

10. **`transfer_public`**:
    - Transfers ANS NFTs between public addresses.
    - Inputs: `r0` (address.private), `r1` (TokenId.private), `r2` (scalar.private).
    - Finalizes the public transfer, updating ownership records.

## Details

- The smart contract facilitates the creation and management of ANS NFTs.
- Various functions handle initialization, minting, updating settings, and ownership transfers.
- Toggle settings are utilized to manage specific contract functionalities.
- Claims are associated with ANS NFTs and cleared after processing.
- Metadata settings such as the base URI and token symbol are configurable.

## Use Case

This smart contract is designed for managing and minting ANS NFTs within the Aleo Games ecosystem. It offers the flexibility to configure metadata, set toggles, and efficiently handle NFT ownership transactions.

---

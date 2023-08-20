# Aleo Games Token Smart Contract

## Overview

This Aleo smart contract implements a token system for gaming platforms, enabling the seamless creation, transfer, and management of gaming tokens among distinct addresses.

## Data Structures

1. **`record token`**:
   - Represents a gaming token.
   - Fields:
     - `owner` (private): Address of the token owner.
     - `amount` (private): Quantity of tokens held by the owner.

2. **`mapping account`**:
   - Associates addresses with token balances.
   - Key: Address (public)
   - Value: Token balance (public).

3. **`mapping mints`**:
   - Tracks token minting times.
   - Key: Address that performed the mint (public)
   - Value: Minting timestamp (public).

## Functions

1. **`mint_public`**:
   - Public function for minting new tokens.
   - Inputs: `r0` (public address), `r1` (public u64), `r2` (public u128).
   - Finalizes the minting process, validating conditions and updating account and mint records.

2. **`mint_private`**:
   - Private function for minting new tokens.
   - Inputs: `r0` (private address), `r1` (private u64).
   - Converts private inputs to a token record and returns it.

3. **`transfer_public`**:
   - Public function for transferring tokens between addresses.
   - Inputs: `r0` (public address), `r1` (public u64).
   - Finalizes the transfer by updating account records for both addresses.

4. **`transfer_private`**:
   - Private function for transferring tokens between addresses.
   - Inputs: `r0` (token record), `r1` (private address), `r2` (private u64).
   - Converts private inputs, updates records, and returns updated token records for both addresses.

5. **`transfer_private_to_public`**:
   - Private function for transferring tokens from private to public address.
   - Inputs: `r0` (token record), `r1` (public address), `r2` (public u64).
   - Finalizes the transfer, converting private inputs to public and updating account records.

6. **`transfer_public_to_private`**:
   - Public function for transferring tokens from public to private address.
   - Inputs: `r0` (public address), `r1` (public u64).
   - Finalizes the transfer by converting public inputs to private and updating account records.

## Details

- The contract supports both public and private functions for token operations.
- The `finalize` keyword is used to complete operations and enforce specific conditions.
- The contract enforces time-based conditions for mints using the `mints` mapping.
- Token records are created, updated, and returned during transfers.
- Transfers between private and public addresses are facilitated through dedicated functions.
- The contract uses various mathematical operations, mappings, and assertions for functionality and security.

## Use Case

This smart contract is ideal for gaming platforms to manage in-game tokens. Players can mint tokens, transfer them between accounts, and convert between public and private addresses while adhering to predefined rules and conditions.

---
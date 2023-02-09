# NFT Minting Dapp

This is an NFT Minting Dapp that allows users to interact with a NFT minting smart contract and mint NFTs.

![](./index.png)

## Connecting a Wallet
The Dapp utilizes wagmi and RainbowKit to give users a smooth and aesthetic connecting experience. By clicking the 'Connect Wallet' button on the top right, they are able to choose from multiple wallet providers to connect their Ethereum wallet.

![](./connect.png)

## Selecting a Mint Amount
![](./select.png)

Users can select how many NFTs they would like to mint. After picking a number, they are able to send a transaction to the smart contract by clicking the 'mint' button.

![](./mint.png)


## Sending the Transaction
After clicking the 'mint' button, they are transported to their wallet provider's prompt page - in this case, it is metamask. Users can review the transaction once more before sending it.

![](./metamask.png)

## Transaction Sent!
Once users confirm the transaction and it is sent successfully, a notification (courtesy of React Toastify) will appear that informs them the transaction was successful, with the transaction hash.

![](./minted.png)

## NFT Minted
Users can now view their NFT on a platform like Opensea.

![](./NFT.png)

## Technologies Used
- Next.js / React.js
- TailwindCSS
- wagmi & RainbowKit
- React Toastify
- TypeScript
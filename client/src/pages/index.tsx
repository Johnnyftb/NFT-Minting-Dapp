import React from 'react';
import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { useAccount, useContractRead } from 'wagmi';
import { contractAddress, contractABI } from '../constants';
import { prepareWriteContract, writeContract } from '@wagmi/core';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';

type ToastMessageProps = {
  header: string,
  body: string
}

const ToastMessage = ({ header, body }: ToastMessageProps) => {
  return (
    <div className="flex flex-col text-dark font-main">
      <h1 className="text-lg font-heading">{header}</h1>
      <p className="text-md text-gray mt-2">{body}</p>
    </div>
  )
}

export default function Home() {

  const [mintAmount, setMintAmount] = React.useState<number>(0);
  const { isConnected } = useAccount();

  const mint = async (): Promise<void> => {
    const amount = mintAmount;
    const config = await prepareWriteContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "mint",
      args: [ethers.BigNumber.from(mintAmount)],
      overrides: {
        value: ethers.utils.parseEther((0.005 * mintAmount).toString())
      }
    });

    try {
      const data = await writeContract(config);
      toast(<ToastMessage header={`You have minted ${amount} NFT/s`} body={`Your transaction should be processed soon at Tx hash: ${data.hash}`} />, {
        position: toast.POSITION.TOP_RIGHT
      })
    } catch (e) {
      toast(<ToastMessage header={"Transaction has failed"} body={"Please try again"}/>, {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  return (
    <>
      <Head>
        <title>NFT Minting Dapp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="bg-dark h-screen w-screen text-red">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-white font-main flex justify-between items-center p-4">
          <div className="flex flex-col">
            <h1 className="font-heading text-3xl">NFT Minting Dapp</h1>
            <p className="mt-2 text-md text-gray">Created by @johnnyftb</p>
          </div>
          <ConnectButton />
        </div>

        {/* Body */}
        <div className="mt-20 max-w-7xl mx-auto text-white font-main flex justify-center items-center">
          <div className="w-72 bg-secondary p-4 rounded-lg shadow-lg flex flex-col items-center">
            <h1 className="font-heading text-2xl">Mint NFTs</h1>
            <p className="text-gray mt-16">Price per NFT: 0.005 Ξ</p>
            <div className="mt-4 flex justify-center items-center space-x-6 text-3xl">
              <FaAngleLeft onClick={() => setMintAmount(prev => prev === 0 ? 0 : prev - 1)} className="cursor-pointer"/>
              <p>{mintAmount}</p>
              <FaAngleRight onClick={() => setMintAmount(prev => prev + 1)} className="cursor-pointer"/>
            </div>
            <p className="mt-4">Total Price: {mintAmount * 0.005} Ξ</p>
            {!mintAmount ? (
              <p className="text-red-500 text-md mt-16">Select a mint amount first</p>
            ) : !isConnected ? (
              <p className="text-red-500 text-md mt-16">Please connect a wallet first</p>
            ) : (
              <button className="bg-white text-dark text-xl px-4 py-2 rounded-lg font-heading mt-16" onClick={() => mint()}>Mint</button>
            )}
          </div>
        </div>

        {/* Toast Container */}
        <ToastContainer autoClose={false}/>
      </main>
    </>
  )
}

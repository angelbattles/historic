import React, { useState, useContext, useEffect } from 'react';
import { getCardDataContract } from './web3/SolidityContracts.js';
import ABCardInfo from '../config/abcardinfo.js';
import Stats from './Stats.js';
import AppContext from './contexts/AppContext';
import './css/site.css';

const TransferInfo = ({ token, id }) => {
    const { transactions } = useContext(AppContext);
    const [currentAddress, setCurrentAddress] = useState('');
    const [name, setName] = useState('');
    const [transfer, setTransfer] = useState('');
    const { connection } = useContext(AppContext);

    useEffect(() => {

        if (
            connection &&
            connection.currentAddress &&
            connection.currentAddress !== currentAddress
        ) {
            setCurrentAddress(connection.currentAddress);
        }
    }, [connection, currentAddress]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleTransferChange = (event) => {
        setTransfer(event.target.value.trim());
    };

    const handleNameSubmit = async (event) => {
        event.preventDefault();
        if (!currentAddress) {
            return;
        }

        const carddata_contract = getCardDataContract();

        transactions
            .trackTransaction(
                'namechange_' + id,
                carddata_contract.methods
                    .setName(id, name)
                    .send({ from: currentAddress })
            )
            .on('transactionHash', function (hash) {
                console.log('Transaction hash: ', hash);
            })
            .on('receipt', function (receipt) {
                console.log('Receipt:', receipt);
            });
    };

    const handleTransferSubmit = async (event) => {
        event.preventDefault();
        if (!currentAddress) {
            return;
        }
        const carddata_contract = getCardDataContract();

        transactions
            .trackTransaction(
                'transfer_' + id,
                carddata_contract.methods
                    .transferFrom(currentAddress, transfer, id)
                    .send({ from: currentAddress })
            )
            .on('transactionHash', function (hash) {
                console.log('Transaction hash: ', hash);
            })
            .on('receipt', function (receipt) {
                console.log('Receipt:', receipt);
            });
    };

    const handleUnwrap = async (e) => {
        e.preventDefault();
        if (!currentAddress) {
            return;
        }

        const carddata_contract = getCardDataContract();

        transactions
            .trackTransaction(
                'unwrap_' + id,
                carddata_contract.methods.unwrap(id).send({ from: currentAddress })
            )
            .on('transactionHash', function (hash) {
                console.log('Transaction hash: ', hash);
            })
            .on('receipt', function (receipt) {
                console.log('Receipt:', receipt);
            });
    };

    const getHumanReadableDate = () => {
        if (parseInt(token.createdTime, 10) === 0) {
            return '-'
        }
        const timestamp = new Date(parseInt(token.createdTime, 10) * 1000);
        var date =
            timestamp.getFullYear() +
            '-' +
            (timestamp.getMonth() + 1) +
            '-' +
            timestamp.getDate();
        var time =
            timestamp.getHours() +
            ':' +
            timestamp.getMinutes() +
            ':' +
            timestamp.getSeconds();
        return date + ' ' + time;
    };

    if (!token) {
        return null;
    }

    return (
        <div>
            <div className="raised ui segment">
                <div className="ui divider"> </div>
                <div className="ui grid">
                    <div className="six wide centered column">
                        <img
                            className="ui centered image"
                            src={`https://ipfs.io/ipfs/QmYHT1FKxYDfc1WUkWA4pkfjnh81SKESeMuSayot5MyEV7/${token.cardSeriesId}.png`}
                            alt="Card"
                        />
                    </div>
                    <div className="eight wide centered column">
                        <table className="ui striped table">
                            <thead>
                                <tr>
                                    <th>Property</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Property">Card Series Name: </td>
                                    <td data-label="Value">
                                        {ABCardInfo.cards[parseInt(token.cardSeriesId, 10)].name}
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Property">Description:</td>
                                    <td data-label="Value">
                                        {
                                            ABCardInfo.cards[parseInt(token.cardSeriesId, 10)]
                                                .description
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Property">Card Id:</td>
                                    <td data-label="Value">{id}</td>
                                </tr>
                                <tr>
                                    <td data-label="Property">Created Time (Angels Only):</td>
                                    <td data-label="Value">{getHumanReadableDate()}</td>
                                </tr>

                                <tr>
                                    <td data-label="Property">Name:</td>
                                    <td data-label="Value">{token.cardName}</td>
                                </tr>
                                <tr>
                                    <td data-label="Property">
                                        Stats:{' '}
                                        <i
                                            className="bolt icon"
                                            title={
                                                'Battle Power - The more battle power, the harder likely to attack'
                                            }
                                        />{' '}
                                    </td>
                                    <td data-label="Value">
                                        <Stats
                                            power={token.power}
                                            experience={token.experience}
                                            red={token.red}
                                            yellow={token.yellow}
                                            blue={token.blue}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        {' '}
                        <span style={{ fontWeight: 'bold' }}> Owner: </span> {token.owner}{' '}
                    </p>

                    <p>
                        After wrapping / unwrapping / transfering / renaming refresh the page to see the updated results.
                    </p>
                    <p>
                        IMPORTANT: Transfering a card is IRREVERSABLE. Make sure to double
                        check the address!{' '}
                    </p>
                    <p>
                        To burn a card, transfer it to the{' '}
                        <a href="https://etherscan.io/address/0x000000000000000000000000000000000000dead">
                            {' '}
                            0xdead{' '}
                        </a>{' '}
                        address.{' '}
                    </p>
                    <table className="ui table">
                        <tbody>
                            <tr>
                                <td>
                                    <form onSubmit={handleNameSubmit}>
                                        <label>
                                            Change Name:
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={handleNameChange}
                                                style={{ marginLeft: '1em' }}
                                            />
                                        </label>
                                        {!transactions.isTransactionPending('namechange_' + id) ? (
                                            <button
                                                className="ui button"
                                                style={{ marginLeft: '1em' }}
                                                onClick={handleNameSubmit}
                                            >
                                                Change{' '}
                                            </button>
                                        ) : (
                                            <button
                                                className="ui button loading"
                                                style={{ marginLeft: '1em' }}
                                            >
                                                Change{' '}
                                            </button>
                                        )}
                                    </form>
                                </td>
                                <td>
                                    <form onSubmit={handleTransferSubmit}>
                                        <label>
                                            Transfer To:
                                            <input
                                                type="text"
                                                value={transfer}
                                                onChange={handleTransferChange}
                                                style={{ marginLeft: '1em' }}
                                            />
                                        </label>
                                        {!transactions.isTransactionPending('transfer_' + id) ? (
                                            <button
                                                className="ui button"
                                                style={{ marginLeft: '1em' }}
                                                onClick={handleTransferSubmit}
                                            >
                                                Transfer{' '}
                                            </button>
                                        ) : (
                                            <button
                                                className="ui button loading"
                                                style={{ marginLeft: '1em' }}
                                            >
                                                Transfer{' '}
                                            </button>
                                        )}
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <div>
                                    You can unwrap this card back to the historical (non-721)
                                    version
                                    {!transactions.isTransactionPending('unwrap_' + id) ? (
                                        <button
                                            className="ui button"
                                            style={{ marginLeft: '1em', marginBottom: '1em' }}
                                            onClick={handleUnwrap}
                                        >
                                            Unwrap{' '}
                                        </button>
                                    ) : (
                                        <button
                                            className="ui button loading"
                                            style={{ marginLeft: '1em', marginBottom: '1em' }}
                                        >
                                            Unwrap{' '}
                                        </button>
                                    )}
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransferInfo;

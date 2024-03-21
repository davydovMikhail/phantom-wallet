
import { useState, useEffect } from 'react';
declare const window: any;

const Main = () => {

    const [pubKey, setPubKey] = useState(null);

    const getProvider = () => {
        if ('phantom' in window) {
            const provider: any = window.phantom?.solana;
        
            if (provider?.isPhantom) {
            return provider;
            }
        }
    
        window.open('https://phantom.app/', '_blank');
    };

    let provider = getProvider();

    useEffect(() => {
        if(provider) {
            provider.on("connect", () => {
                setPubKey(provider.publicKey.toString());
            });
            provider.on("disconnect", () => {
                setPubKey(null);
            });
        }
    }, [provider]);

    async function activateBrowserWallet() {
        try {
            await provider.connect();
        } catch (err) {
            window.open('https://phantom.app/', '_blank');
            console.log(err);
        }
    }
   
    return (
        <>
            <div className="nude">
                <div className="wrapper">
                    <div className="main">
                        <div className="section section-white">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-2">
                                        <button onClick={() => activateBrowserWallet()} type="button" className="btn btn-warning btn-lg">Connect Wallet</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        address: {pubKey}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
        
    )
}

export default Main;
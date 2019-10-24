import * as IPFS from 'ipfs-api';

const gatewayUrl = 'https://gateway.ipfs.io/ipfs';

export class IPFSService {

    private ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

    getDataUrl(hash) {
        return gatewayUrl + `/${hash}`;
    }

    async addData(data) {
        return this.ipfs.add(data);
    }

}
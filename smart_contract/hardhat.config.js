require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/z4WpA8UKgqnwbTYmrZu15yCOiijBKaRv',
      accounts: ['fd7d96b23854e9718479ce89b4ec5b056414982a3688c8ab4065cad58858ef17'],
    },
  },
};

// Transactions address:  0x4551333B173C606665d39d66c4EB034D8046DFe5
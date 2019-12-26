export default {
    api: process.env.REACT_APP_API || 'http://localhost:4000/graphql',
    version: '0.0.1',
    bugsnag: {
    },
    query: {
      limit: 20,
    },
    stripe: {
      apiKey:
        process.env.REACT_APP_STRIPE_KEY || 'pk_test_9YRr1T36PUthpSWPf2MLljmk',
    },
  };
  
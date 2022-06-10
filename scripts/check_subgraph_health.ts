import axios from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { merge } from 'lodash';

const URL = 'https://api.thegraph.com/index-node/graphql';

async function main() {
  const data = await get(query());
  console.log(data.indexingStatusForCurrentVersion.fatalError);
}

async function get(query) {
  try {
    const payload = toPayload(query);
    const resp = await axios.post(URL, payload);
    return resp.data.data;
  } catch (error) {
    console.error(error);
  }
}

const defaultAttrs = {
  synced: true,
  health: true,
  fatalError: {
    message: true,
    block: {
      number: true,
      hash: true,
    },
    handler: true,
  },
  chains: {
    chainHeadBlock: {
      number: true,
    },
    latestBlock: {
      number: true,
    },
  },
};

const defaultArgs = {
  subgraphName: 'kyzooghost/bebe',
};

function toPayload(query) {
  return JSON.stringify({ query: jsonToGraphQLQuery({ query }) });
}

function query(args = {}, attrs = {}) {
  const query = {
    indexingStatusForCurrentVersion: {
      __args: merge({}, defaultArgs, args),
      ...merge({}, defaultAttrs, attrs),
    },
  };

  return query;
}

main().catch((e) => {
  console.error(`index.ts - Discord bot crashed at ${new Date()}`);
  console.error(e);
});

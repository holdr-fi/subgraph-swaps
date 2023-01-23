**Notes**
The .ts files in `src/mappings` are not Typescript files, but AssemblyScript which is compiled to Web Assembly

**Prerequisites**
- graph-cli => `sudo yarn global add @graphprotocol/graph-cli`
- [GraphQL Hosted Service Account](https://thegraph.com/hosted-service/)
    - Create by linking Github account
    - Authenticate your local to deploy to your GraphQL account with `graph auth <PROVIDED_AUTH_KEY>`

</br>

**Steps**

1. `yarn` to install base dependencies
2. Create Mumbai profile in `./networks/yaml` and add Vault and WeightedPoolV2Factory addresses
3. Add Mumbai property to `AddressByNetwork` class in `src/mappings/helpers/constants.ts`. Add `else if (network == 'mumbai')` case to `function forNetwork()`.
4. `yarn codegen` => Generates required deployment files
5. `yarn build` => Builds subgraph into `./dist` folder
6. `graph deploy --product hosted-service <REPO_NAME/GRAPH_NAME> subgraph.<NETWORK>.yaml` => Build and deploy subgraph to specified Hosted Service project

</br>

## Other CLI commands

### Start local graph node

Start local PostgresQL instance

```
initdb -D .postgres --locale=C --encoding=UTF8 && pg_ctl -D .postgres -l logfile start && createdb graph-node
```

`git clone https://github.com/graphprotocol/graph-node.git` then into graph-node folder run

```
cargo run -p graph-node --release -- \
  --postgres-url postgresql://jefferson:jefferson@localhost:5432/graph-node \
  --ethereum-rpc aurora:https://mainnet.aurora.dev \
  --ipfs 127.0.0.1:5001 \
  --fork-base https://api.thegraph.com/subgraphs/id/
```

Shut down graph node

```
pg_ctl stop -D .postgres && rm -rf .postgres
ps aux | grep postgrep
lsof -i :5432
```

Run subgraph on local graph node fork
```
graph create --node http://localhost:8020 subgraph-swap

graph deploy subgraph-swap --debug-fork QmUGXfmzbYFXdPawrifQutaKdFPjyCyBebA974rYYo8eoD --ipfs http://localhost:5001 --node http://localhost:8020 -l 0.0.1 subgraph.aurora.yaml
```
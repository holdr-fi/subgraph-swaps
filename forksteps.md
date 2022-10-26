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
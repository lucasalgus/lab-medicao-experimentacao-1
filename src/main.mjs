import fs from "fs";
import gql from "graphql-tag";

import { client } from "./client.mjs";

let repos = [];
let lastCursor = null;

const query = gql`
  query Repos {
    search(query: "stars:>10000", type: REPOSITORY, first: 100, after: ${lastCursor}) {
      pageInfo {
        endCursor
      }
      nodes {
        ... on Repository {
          nameWithOwner
          url
          createdAt
          updatedAt
          stargazers {
            totalCount
          }
          releases {
            totalCount
          }
          languages(orderBy: { field: SIZE, direction: DESC }, first: 1) {
            edges {
              node {
                name
              }
            }
          }
          TOTAL_ISSUES: issues {
            totalCount
          }
          CLOSED_ISSUES: issues(states: CLOSED) {
            totalCount
          }
        }
      }
    }
  }
`;

const main = async () => {
  try {
    for (let i = 0; i < 10; i++) {
      const res = await client.query({
        query: query,
      });

      const { endCursor } = res.data.search.pageInfo;
      lastCursor = endCursor;

      repos = [...repos, ...res.data.search.nodes];
    }

    fs.writeFileSync("./result.json", JSON.stringify(repos));
  } catch (error) {
    console.log(error);
  }
};

main();

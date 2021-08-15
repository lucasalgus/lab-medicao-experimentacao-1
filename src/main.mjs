import gql from "graphql-tag";

import { client } from "./client.mjs";

const RQs = [
  {
    name: "RQ1",
    query: gql`
      query RQ1 {
        search(query: "stars:>10000", type: REPOSITORY, first: 100) {
          nodes {
            ... on Repository {
              nameWithOwner
              createdAt
              stargazers {
                totalCount
              }
            }
          }
        }
      }
    `,
  },
  {
    name: "RQ2",
    query: gql`
      query RQ2 {
        search(query: "stars:>10000", type: REPOSITORY, first: 100) {
          nodes {
            ... on Repository {
              nameWithOwner
              url
              createdAt
              stargazers {
                totalCount
              }
              pullRequests {
                totalCount
              }
            }
          }
        }
      }
    `,
  },
  {
    name: "RQ3",
    query: gql`
      query RQ3 {
        search(query: "stars:>10000", type: REPOSITORY, first: 100) {
          nodes {
            ... on Repository {
              nameWithOwner
              createdAt
              stargazers {
                totalCount
              }
              releases {
                totalCount
              }
            }
          }
        }
      }
    `,
  },
  {
    name: "RQ4",
    query: gql`
      query RQ4 {
        search(query: "stars:>10000", type: REPOSITORY, first: 100) {
          nodes {
            ... on Repository {
              nameWithOwner
              createdAt
              stargazers {
                totalCount
              }
              updatedAt
            }
          }
        }
      }
    `,
  },
  {
    name: "RQ5",
    query: gql`
      query RQ5 {
        search(query: "stars:>10000", type: REPOSITORY, first: 100) {
          nodes {
            ... on Repository {
              nameWithOwner
              stargazers {
                totalCount
              }
              languages(orderBy: { field: SIZE, direction: DESC }, first: 1) {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
  {
    name: "RQ6",
    query: gql`
      query RQ6 {
        search(query: "stars:>10000 sort:stars", type: REPOSITORY, first: 100) {
          nodes {
            ... on Repository {
              nameWithOwner
              createdAt
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
    `,
  },
];

const main = async () => {
  for (const rq of RQs) {
    try {
      const res = await client.query({
        query: rq.query,
      });

      console.log(rq.name);
      console.log(JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  }
};

main();

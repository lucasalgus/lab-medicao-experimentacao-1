import gql from "graphql-tag";

import { client } from "./client.mjs"

const query = gql`
	query ViewerQuery {
		viewer {
			login
		}
	}
`;

client.query({
	query
})
	.then(resp => console.log(resp.data.viewer.login))
	.catch(error => console.error(error));
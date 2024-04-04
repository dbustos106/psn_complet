import request from 'request-promise-native';
import crypto from 'crypto';
import { URL } from 'url';

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
export async function generalRequest(url, method, headers, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		headers,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
export function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) && parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Convert a body to urlEncoded
 * @param {object} [body]
 * @return {Promise.<*>}
 */
export function formToUrlEncoded(body) {
	var formBody = [];
	for (var property in body) {
	  var encodedKey = encodeURIComponent(property);
	  var encodedValue = encodeURIComponent(body[property]);
	  formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&");
	return formBody;
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
export function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {string} service_account_file
 * @param {string} bucket_name
 * @param {string} object_name
 * @param {object} subresource
 * @param {integer} expiration
 * @param {string} http_method
 * @return {string}
 */
export function generate_signed_url(service_account_file, bucket_name, object_name,
	subresource=null, expiration=604800, http_method='GET',
	query_parameters=null, headers=null) {
	
	if (expiration > 604800) {
	  	console.log("Expiration Time can't be longer than 604800 seconds (7 days).");
	  	process.exit(1);
	}
	
	const escaped_object_name = encodeURI(object_name);
	const canonical_uri = `/${escaped_object_name}`;
	
	const datetime_now = new Date();
	datetime_now.setTime(datetime_now.getTime() + datetime_now.getTimezoneOffset() * 60 * 1000);
	const request_timestamp = datetime_now.toISOString().replace(/[:-]|\.\d{3}/g, '');
	const datestamp = datetime_now.toISOString().split('T')[0].replace(/-/g, '');
	
	const { client_email } = require(service_account_file);
	const credential_scope = `${datestamp}/auto/storage/goog4_request`;
	const credential = `${client_email}/${credential_scope}`;
	
	if (!headers) headers = {};
	const host = `${bucket_name}.storage.googleapis.com`;
	headers['host'] = host;
	
	let canonical_headers = '';
	Object.keys(headers).sort().forEach((k) => {
	  	const lower_k = k.toLowerCase();
	  	const strip_v = String(headers[k]).trim().toLowerCase();
	  	canonical_headers += `${lower_k}:${strip_v}\n`;
	});
	
	let signed_headers = '';
	Object.keys(headers).sort().forEach((k) => {
	  	const lower_k = k.toLowerCase();
	  	signed_headers += `${lower_k};`;
	});
	signed_headers = signed_headers.slice(0, -1);
	
	if (!query_parameters) query_parameters = {};
	query_parameters['X-Goog-Algorithm'] = 'GOOG4-RSA-SHA256';
	query_parameters['X-Goog-Credential'] = credential;
	query_parameters['X-Goog-Date'] = request_timestamp;
	query_parameters['X-Goog-Expires'] = expiration;
	query_parameters['X-Goog-SignedHeaders'] = signed_headers;
	if (subresource) query_parameters[subresource] = '';
	
	let canonical_query_string = '';
	Object.keys(query_parameters).sort().forEach((k) => {
	  	const encoded_k = encodeURIComponent(k);
	  	const encoded_v = encodeURIComponent(query_parameters[k]);
	  	canonical_query_string += `${encoded_k}=${encoded_v}&`;
	});
	canonical_query_string = canonical_query_string.slice(0, -1);
	
	const canonical_request = [
	  	http_method,
	  	canonical_uri,
	  	canonical_query_string,
	  	canonical_headers,
	  	signed_headers,
	  	'UNSIGNED-PAYLOAD'
	].join('\n');
	
	const canonical_request_hash = crypto.createHash('sha256').update(canonical_request).digest('hex');
	
	const string_to_sign = [
	  	'GOOG4-RSA-SHA256',
	  	request_timestamp,
	  	credential_scope,
	  	canonical_request_hash
	].join('\n');
	
	const signer = require(service_account_file).private_key;
	const signature = crypto.createSign('RSA-SHA256').update(string_to_sign).sign(signer, 'hex');
	
	const parsed_url = new URL(`https://${host}${canonical_uri}`);
	parsed_url.search = canonical_query_string;
	
	return `${parsed_url.toString()}&x-goog-signature=${signature}`;
}
  

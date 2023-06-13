export default function chunkSubstr(str, size) {
	let chunks = str.split(' ');
	let results = [];

	for (var i = 0; i < chunks.length - 1; i += 6) {
		results.push(chunks[i] + " " + chunks[i+1] + " " + chunks[i+2] + " " + chunks[i+3] + " " + chunks[i+4] 
					+ " " +  chunks[i+5] );
	}
	return results;
};
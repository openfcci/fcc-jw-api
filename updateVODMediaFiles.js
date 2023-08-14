const sdk = require('api')('@jwp-platform/v1.0#5jjp925ulkvczvf9');

const siteId = 'jWZqVjvO';

sdk.auth('jpP_C6yJ3E3bW_qVlHmVxWInZFU1T1pVeEdTMU50VEhkM1QybEpUVEpJYURNeGVsbzAn');
sdk.getV2SitesSite_idMedia({
  page: '1',
  page_length: '20',
  q: 'hosting_type%3A%20hosted',
  sort: 'created%3Aasc',
  site_id: siteId
})
.then(({ data }) => {
  data.media.forEach(item => {

    let updatedCustomParams = {
        requires_authentication: 'true'
      };
    if (item.metadata.custom_params !== null || Object.keys(item.metadata.custom_params).length !== 0){
      updatedCustomParams = {
          ...item.metadata.custom_params,
          requires_authentication: 'true'
        };
    }
      sdk.patchV2SitesSite_idMediaMedia_id({
        metadata: {
          custom_params: updatedCustomParams

        }
      }, {
        site_id: siteId,
        media_id: item.id
      })

    console.log('Custom param setup:', updatedCustomParams);
  });
})
.catch(err => console.error(err));


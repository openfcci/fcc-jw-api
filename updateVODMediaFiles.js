const sdk = require('api')('@jwp-platform/v1.0#5jjp925ulkvczvf9');

const siteId = 'SITE_ID_HERE';

sdk.auth('ADMIN_API_KEY_HERE');
sdk.getV2SitesSite_idMedia({
  page: '1',
  page_length: '10',
  q: 'hosting_type%3A%20hosted',
  sort: 'publish_start_date%3Aasc',
  site_id: siteId
})
.then(async ({ data }) => {
  console.log('Total items:', data.media.length);

  for (const item of data.media) {
    try {
      let updatedCustomParams = {};

      if (!item.metadata.custom_params || Object.keys(item.metadata.custom_params).length === 0) {
        updatedCustomParams = {
          requires_authentication: 'true'
        };
      } else {
        const params = item.metadata.custom_params;
        updatedCustomParams = {
          ...params,
          requires_authentication: 'true'
        };
      }

      console.log('Updating custom params for media_id:', item.id);
      console.log('custom params are:', item.metadata.custom_params);
      console.log('custom params after update are:', updatedCustomParams);

      await sdk.patchV2SitesSite_idMediaMedia_id(
        {
          metadata: {
            custom_params: updatedCustomParams
          }
        },
        {
          site_id: siteId,
          media_id: item.id
        }
      );

      console.log('Custom param updated for media_id:', item.id);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error(`Error updating custom params for media_id ${item.id}:`, error.response.data);
      } else {
        console.error(`Error updating custom params for media_id ${item.id}:`, error);
      }
    }
  }
})
.catch(err => console.error(err));
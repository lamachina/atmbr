import * as React from 'react';
import styled from 'styled-components/macro';
import { A } from 'app/components/A';
import { Title } from 'app/pages/HomePage/components/Title';
import { extractAtomicalsidFromUrl } from 'utils/helpers';

interface Props {
  data: any;
  profileLink?: boolean;
  delegateInfo:any;
  profileData:any;
  pfpUrn:string;
}
interface Link {
  name: string;
  url: string;
  type: string;
}

interface PreviewItem {
  img: string;
  text: string;
  type: string;
}

interface Collection {
  desc: string;
  meta: {
    note: string;
    order: number;
    display: string;
  };
  name: string;
  image: string;
  preview: {
    [key: string]: PreviewItem;
  };
}
interface ProfileData {
  name: string;
  desc: string;
  // ... other properties
}

interface CollectionValue {
  name: string;
  desc: string;
  image: string;
  meta?: {
    display: string;
    note: string;
    order: number;
  };
  preview?: {
    [key: string]: {
      img: string;
      text: string;
      type: string;
    };
  };
}
interface ObjectValue {
  [key: string]: string | number | CollectionValue | ObjectValue;
}

export function RealmInfo({ data, pfpUrn, delegateInfo, profileData, profileLink }: Props) {

  const [apiResponse, setApiResponse] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

console.log(profileData);

React.useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`https://ep.atomicalswallet.com/proxy/blockchain.atomicals.get_state?params=["${pfpUrn}"]&pretty`);
      const apiData = await response.json();

      // Function to find the property after "latest" and fetch its "$d" items
      const getLatestData = (latestObject) => {
        for (const key in latestObject) {
          if (latestObject[key]?.$d) {
            return latestObject[key].$d;
          }
        }
        return null; // Handle the case when no suitable property is found
      };

      // Extract the desired property
      const latestFileData = apiData?.response?.result?.state?.latest && getLatestData(apiData.response.result.state.latest);
      const base64ImageData = Buffer.from(latestFileData, 'hex').toString('base64');
      // Update the component state with the extracted data
      setApiResponse(base64ImageData);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [pfpUrn]);


  function getLinkItems(links?: { [key: string]: Link }) {
    if (!links) {
      return null; // Or handle the case when links is undefined
    }
  
    return Object.values(links).map(link => (
      <div key={link.name}>
        <FieldLabel>{link.name}:</FieldLabel>
        <FieldItem>
          <A target='_blank' href={link.url}>
          {link.url}
          </A>
        </FieldItem>
      </div>
    ));
  }
  const renderObject = (object: ObjectValue) => {
    if (!object) {
      return null;
    }
  
    return (
      <div>
        {Object.entries(object).map(([key, value]) => (
          <div key={key}>
            {key === 'collections' ? (
              Object.entries(value as { [key: string]: CollectionValue }).map(([collectionKey, collectionValue]) => (
                <div key={collectionKey}>
                  <h3>{collectionValue.name}</h3>
                  <p>{collectionValue.desc}</p>
                  {collectionValue.meta && (
                    <>
                    {/*   <p>{collectionValue.meta.note}</p>
                      <p>{collectionValue.meta.order}</p>
                      {collectionValue.meta.display && <p>{collectionValue.meta.display}</p>} */}
                    </>
                  )}
                {/*   {collectionValue.preview &&
                    Object.values(collectionValue.preview).map((previewItem, index) => (
                      <div key={index}>
                        <p>{previewItem.text}</p>
                        <p>{previewItem.type}</p>
                      </div>
                    ))} */}
                </div>
              ))
            ) : (
              <>
                
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  
  const realmFullName = () => {
    if (!data) {
      return '';
    }
    return data?.$full_realm_name;
  };

  const rawDataUrl = () => {
    if (!data) {
      return '';
    }
    return `https://ep.atomicals.xyz/proxy/blockchain.atomicals.get?params=["${data.atomical_id}"]&pretty`;
  };

  const realmLocation = () => {
    if (!data) {
      return '';
    }
    return data?.mint_info.reveal_location_txid;
  };
  const realmId = () => {
    if (!data) {
      return '';
    }
    return data?.atomical_id;
  };
  const atomicalNumber = () => {
    if (!data) {
      return '';
    }
    return data?.atomical_number;
  };
  const atomicalRef = () => {
    if (!data) {
      return '';
    }
    return data?.atomical_ref;
  };

  const locationInfo = () => {
    if (!data) {
      return '';
    }
    return !!data?.location_info.length;
  };
  const locationInfoTxId = () => {
    if (!data) {
      return '';
    }
    return data?.location_info[0].txid;
  };

  const locationInfoAddress = () => {
    if (!data) {
      return '';
    }
    return data?.location_info[0].scripthash;
  };


  return (
    <Wrapper>
      {data && (
        <>
        <Nameheadline className="text-center">
      <Title as="h2">+{realmFullName()}</Title>
    </Nameheadline>
    <FieldItemCenter>
    <Img width={'144px'} src={`data:image/png;base64,${apiResponse}`} alt="Delegate Image" />
    </FieldItemCenter>
    <Nameheadline className="text-center">
      <Title as="h1">{profileData?.name || ''}</Title>
    </Nameheadline>
    <FieldItem>{profileData?.desc || ''}</FieldItem>

    <Divider/>
    
          {getLinkItems(profileData?.links?.links?.items)}
          <Divider/>

          {renderObject(profileData)}
         
          {profileLink && (
            <ProfileField>
              <ProfileFieldInner>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
                &nbsp;&nbsp;
                <A href={'/' + realmFullName()}>View +{realmFullName()}'s profile</A>
              </ProfileFieldInner>
            </ProfileField>
          )}
          <Divider />

          
          <FieldLabel>Raw data</FieldLabel>
          <FieldItem>
            <A href={rawDataUrl()} target="_blank">
              View raw data
            </A>
          </FieldItem>
        </>
      )}
    </Wrapper>
  );
}

/* Img */
const Img = styled.img`
  border-radius: 10%;
`;

const ProfileField = styled.div`
  display: flex;

  align-items: center;
`;
const ProfileFieldInner = styled.div``;

const Divider = styled.div`
  color: ${p => p.theme.text};
  border-top: solid 1px #484848;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Lead = styled.p`
  color: ${p => p.theme.text};
`;

const FieldItem = styled.p`
  color: ${p => p.theme.text};
  margin-bottom: 10px;
`;
const FieldItemCenter = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;
  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`;

const FieldLabel = styled.div`
  color: ${p => p.theme.textSecondary};
  margin-bottom: 5px;
`;

const Wrapper = styled.div`
  font-weight: 500;
  color: ${p => p.theme.text};
`;
 
const Nameheadline = styled.div`
width:100%
  whitespace: nowrap;
  text-align: center;
  justify-content: center;
  display: flex;
`;
import * as React from 'react';
import styled from 'styled-components/macro';
import { A } from 'app/components/A';
import { Title } from 'app/pages/HomePage/components/Title';
import { extractAtomicalsidFromUrl } from 'utils/helpers';
import Collection from './collection/collection';
import { BigLogo } from '../BigLogo';

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

  const realmId = () => {
    if (!data) {
      return '';
    }
    return data?.atomical_id;
  };
  const atomicalRef = () => {
    if (!data) {
      return '';
    }
    return data?.atomical_ref;
  };

  const [apiResponse, setApiResponse] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

console.log("pfp:", pfpUrn);

React.useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`https://ep.atomicalswallet.com/proxy/blockchain.atomicals.get_state?params=["${pfpUrn}"]&pretty`);
      const apiData = await response.json();

      // Function to find the property after "latest" and fetch its "$d" items
      const getLatestData = (latestObject) => {
        for (const key in latestObject) {
          if (latestObject[key]?.$b) {
            return latestObject[key].$b;
          }
        }
        return null; // Handle the case when no suitable property is found
      };

      const latestFileData = apiData?.response?.result?.state?.latest && getLatestData(apiData.response.result.state.latest);

      let base64ImageData;
      
      if (typeof latestFileData === 'string') {
        // If latestFileData is a string, convert it to base64
        base64ImageData = Buffer.from(latestFileData, 'hex').toString('base64');
      setApiResponse(base64ImageData);

      } else if (typeof latestFileData === 'object' && latestFileData.$b) {
        // If latestFileData is an object with a $b property, use it
        base64ImageData = Buffer.from(latestFileData.$b, 'hex').toString('base64');
      setApiResponse(base64ImageData);

      } else {
        // Handle other cases or set base64ImageData to a default value
        base64ImageData = ''; // Change this to the default value you want to use
      setApiResponse(base64ImageData);

      }
      
      // Update the component state with the extracted data
      
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
                <Collection key={collectionKey} data={collectionValue} />
              ))
            ) : (
              <>
                {/* Render other object properties if needed */}
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



  return (
    <Wrapper>
      {data && (
        <>
        <Nameheadline className="text-center">
      <Title as="h2">+{realmFullName()}</Title>
    </Nameheadline>
    <FieldItemCenter>
    {apiResponse ? (
              <Img width={'144px'} src={`data:image/png;base64,${apiResponse}`} alt="Delegate Image" />
            ) : (
              <BigLogo  />
            )}
    </FieldItemCenter>
    <Nameheadline className="text-center">
      <Title as="h1">{profileData?.name || ''}</Title>
    </Nameheadline>
    <FieldItem>{profileData?.desc || ''}</FieldItem>

    <Divider/>
    {Object.keys(profileData?.links || {}).map((key) => (
  getLinkItems(profileData?.links?.[key]?.items)
))}

          <Divider/>
          
          <FieldItemCenter>
          Collections
          </FieldItemCenter>
          {renderObject(profileData)}

          <Divider/>
          <FieldLabel>Atomical ID:</FieldLabel>
          <FieldItem>
            <A href={'https://mempool.space/tx/' + realmId()} target="_blank">
              {realmId()}
            </A>
          </FieldItem>

          <FieldLabel>Atomical Ref:</FieldLabel>
          <FieldItem>{atomicalRef()}</FieldItem>
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
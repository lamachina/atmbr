import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { extractAtomicalsidFromUrl } from 'utils/helpers';
import gsap from 'gsap';
import { ButtonPrimaryNew } from 'app/components/ButtonPrimaryNew';

interface PreviewItem {
  img: string;
  text: string;
  type: string;
}

const Collection = ({ data }) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [imageData, setImageData] = useState<{ text: string; imageData: string }[] | null>(null);

  const onSearchName = () => {
    const encodedName = encodeURIComponent(data.name);
    const url = `https://wizz.cash/dmint/${encodedName}`;
    window.open(url, '_blank');
  };
  
  
  const extractAndFetchPreviewImages = async () => {
    try {
      const previewImagePromises = (Object.values(data.preview) as PreviewItem[]).map(async (previewItem) => {
        const extracted = extractAtomicalsidFromUrl(previewItem.img);
        const response = await fetch(`https://ep.atomicalswallet.com/proxy/blockchain.atomicals.get_state?params=["${extracted}"]&pretty`);
        const apiData = await response.json();
        const latestFileData = apiData?.response?.result?.state?.latest && getLatestData(apiData.response.result.state.latest);
        const base64ImageData = Buffer.from(latestFileData, 'hex').toString('base64');
        return { text: previewItem.text, imageData: base64ImageData };
      });

      const previewImages = await Promise.all(previewImagePromises);
      setImageData(previewImages);
    } catch (error) {
      console.error('Error fetching preview images:', error);
    }
  };
  
  useEffect(() => {
    extractAndFetchPreviewImages();
    animateExpand();
  }, [data]);
  

  const animateExpand = () => {
    gsap.fromTo('.collection-details', { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.inOut' });
  };

  const animateCollapse = () => {
    gsap.to('.collection-details', { height: 0, opacity: 0, duration: 0.5, ease: 'power2.inOut' });
  };

  const getLatestData = (latestObject) => {
    for (const key in latestObject) {
      if (latestObject[key]?.$d) {
        return latestObject[key].$d;
      }
    }
    return null;
  };

  return (
    <div>
      <Nameheadline as="h2" onClick={() => setExpanded(!expanded)}>
        {data.name}
      </Nameheadline>
      {expanded && (
        <div className="collection-details">
          <p>{data.desc}</p>
          <FieldItemCenter>
            {/* Display other information about the collection */}
            {imageData &&
              imageData.map((previewItem, index) => (
                <div key={index}>
                  <p>{previewItem.text}</p>
                  <Img src={`data:image/png;base64,${previewItem.imageData}`} alt={`Preview Image ${index}`} />
                </div>
              ))}
          </FieldItemCenter>
          <ButtonPrimaryNew block={false} onClick={onSearchName}>
          {' '}
          See more on Wizz
        </ButtonPrimaryNew>
        </div>
      )}

    </div>
  );
};

export default Collection;
const FieldItemCenter = styled.div`
padding-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;
  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`;
const Img = styled.img`
  border-radius: 10%;
  height: 144px;
`;
const Nameheadline = styled.div`
padding-bottom:10px;
width:100%
  whitespace: nowrap;
  text-align: center;
  justify-content: center;
  display: flex;
  &:hover {
    color: #db7e03;
  }
`;
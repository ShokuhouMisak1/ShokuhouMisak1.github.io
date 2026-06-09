// Shadowed copy of gatsby-theme-academic's Experience page.
// Change from the theme original: instead of splitting entries into a left and
// a right column by `position`, render all `experience` entries in a single
// horizontally-centered column. The `position` field in config.js is ignored.
//
// To restore the original two-column layout, delete this file.
//
// Imports use the '@' alias (-> theme src) so they resolve from this shadow
// location instead of against this folder.
import {
  Col, Panel, PanelGroup, FlexboxGrid,
} from 'rsuite';
import React from 'react';

import SEO from '@/components/Seo';
import { useSiteMetadata } from '@/utils/hooks';
import Utils from '@/utils/pageUtils.mjs';

const generateListItem = (data) => {
  const title = Utils.parseMarkDown(data.title, true);
  const description = Utils.parseMarkDown(data.description, true);
  return (
    <Panel style={{ padding: '12.5px 20px' }}>
      <h6 dangerouslySetInnerHTML={{ __html: title }} />
      <div style={{ color: 'var(--rs-text-secondary)' }}>{`${data.date}, ${data.location}`}</div>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </Panel>
  );
};

const generateExperience = (data) => (
  <Panel
    className="cursor-default"
    style={{ margin: '20px 5px', padding: '0px' }}
    bordered
    header={<h3>{data.title || ''}</h3>}
  >
    <PanelGroup>
      {data.data.map(generateListItem)}
    </PanelGroup>
  </Panel>
);

const Experience = () => {
  const siteMetadata = useSiteMetadata();
  const experience = siteMetadata.experience || [];
  return (
    <>
      <SEO
        title="Experience"
        description="My teaching and professional experience."
        path="experience"
      />
      <div className="marginTopTitle">
        <h1 className="titleSeparate">Experience</h1>
      </div>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item as={Col} xs={24} sm={24} md={16} lg={14}>
          {experience.map(generateExperience)}
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default Experience;

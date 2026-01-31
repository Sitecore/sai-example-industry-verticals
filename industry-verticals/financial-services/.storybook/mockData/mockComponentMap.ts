import { NextjsContentSdkComponent } from '@sitecore-content-sdk/nextjs';
import { componentMap as originalComponentMap } from '../../.sitecore/component-map';

import { MockPlaceholder } from '../../src/stories/helpers/renderStorybookPlaceholder';

// You can manually add custom components here for Storybook testing
const customComponents = new Map<string, NextjsContentSdkComponent>([
  ['MockPlaceholder', MockPlaceholder],
]);

// Create the mock component map by combining original and custom components
export const mockComponentMap = new Map<string, NextjsContentSdkComponent>([
  ...originalComponentMap.entries(),
  ...customComponents.entries(),
]);

export default mockComponentMap;

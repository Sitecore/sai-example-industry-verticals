import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as Footer } from '../components/footer/Footer';
import { ComponentProps } from 'react';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { CommonParams, CommonRendering } from './common/commonData';
import {
  createImageField,
  createLinkField,
  createRichTextField,
  createTextField,
} from './helpers/createFields';
import { ComponentFields } from '@sitecore-content-sdk/nextjs';

type StoryProps = ComponentProps<typeof Footer>;

const meta = {
  title: 'Global Elements/Footer',
  component: Footer,
  tags: ['autodocs'],
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Container',
  params: baseParams,
};

export const WithPlaceholders: Story = {
  render: () => {
    return (
      <Footer
        params={baseParams}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`footer-list-first-${baseParams.DynamicPlaceholderId}`]: [
              renderStorybookPlaceholder(),
            ],
            [`footer-list-second-${baseParams.DynamicPlaceholderId}`]: [
              renderStorybookPlaceholder(),
            ],
            [`footer-list-third-${baseParams.DynamicPlaceholderId}`]: [
              renderStorybookPlaceholder(),
            ],
            [`footer-list-fourth-${baseParams.DynamicPlaceholderId}`]: [
              renderStorybookPlaceholder(),
            ],
            [`footer-list-fifth-${baseParams.DynamicPlaceholderId}`]: [
              renderStorybookPlaceholder(),
            ],
          },
        }}
        fields={{
          TitleOne: createTextField('Furniture'),
          TitleTwo: createTextField('Services'),
          TitleThree: createTextField('Support'),
          TitleFour: createTextField('Follow Us'),
          TitleFive: createTextField('Install App'),
          CopyrightText: createTextField('Copyright © 2025'),
          PolicyText: createLinkField('Privacy Policy'),
          TermsText: createLinkField('Terms & Conditions'),
          Description: createRichTextField(),
          Logo: createImageField('logo'),
        }}
      />
    );
  },
};

export const WithData: Story = {
  render: () => {
    return (
      <Footer
        params={baseParams}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`footer-list-first-${baseParams.DynamicPlaceholderId}`]: [
              {
                componentName: 'LinkList',
                params: {
                  Styles: 'list-vertical',
                },
                fields: {
                  data: {
                    datasource: {
                      children: {
                        results: [
                          {
                            field: {
                              link: {
                                value: {
                                  href: 'http://',
                                  linktype: 'external',
                                  text: 'Bed',
                                },
                              },
                            },
                          },
                          {
                            field: {
                              link: {
                                value: {
                                  href: 'http://',
                                  linktype: 'external',
                                  text: 'Chair',
                                },
                              },
                            },
                          },
                          {
                            field: {
                              link: {
                                value: {
                                  href: 'http://',
                                  linktype: 'external',
                                  text: 'All',
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                } as unknown as ComponentFields,
              },
            ],
            [`footer-list-second-${baseParams.DynamicPlaceholderId}`]: [
              {
                componentName: 'LinkList',
                params: {
                  Styles: 'list-vertical',
                },
                fields: {
                  data: {
                    datasource: {
                      children: {
                        results: [
                          {
                            field: {
                              link: {
                                value: {
                                  href: 'http://',
                                  linktype: 'external',
                                  text: 'Email Marketing',
                                },
                              },
                            },
                          },
                          {
                            field: {
                              link: {
                                value: {
                                  href: 'http://',
                                  linktype: 'external',
                                  text: 'Campaigns',
                                },
                              },
                            },
                          },
                          {
                            field: {
                              link: {
                                value: {
                                  href: 'http://',
                                  linktype: 'external',
                                  text: 'Branding',
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                } as unknown as ComponentFields,
              },
            ],
            [`footer-list-third-${baseParams.DynamicPlaceholderId}`]: [
              {
                componentName: 'LinkList',
                params: {
                  Styles: 'list-vertical',
                },
                fields: {
                  data: {
                    datasource: {
                      children: {
                        results: [
                          {
                            field: {
                              link: {
                                value: {
                                  href: 'http://',
                                  linktype: 'external',
                                  text: 'Help Center',
                                },
                              },
                            },
                          },
                          {
                            field: {
                              link: {
                                value: {
                                  href: 'http://',
                                  linktype: 'external',
                                  text: 'Safety Center',
                                },
                              },
                            },
                          },
                          {
                            field: {
                              link: {
                                value: {
                                  href: 'http://',
                                  linktype: 'external',
                                  text: 'Communnity Guidelines',
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                } as unknown as ComponentFields,
              },
            ],
            [`footer-list-fourth-${baseParams.DynamicPlaceholderId}`]: [
              renderStorybookPlaceholder(),
            ],
            [`footer-list-fifth-${baseParams.DynamicPlaceholderId}`]: [
              {
                componentName: 'Container',
                params: {
                  DynamicPlaceholderId: '3',
                },
                placeholders: {
                  'container-{*}': [
                    {
                      componentName: 'RichText',
                      params: {
                        DynamicPlaceholderId: '4',
                      },
                      fields: {
                        Text: {
                          value:
                            '<div class="ck-content"><p><img style="aspect-ratio:162/48;" src="-/media/9CF4D04E4FEF47FDA354DB3E96945156.ashx" alt="" width="162" height="48" /></p></div>',
                        },
                      },
                    },
                    {
                      componentName: 'RichText',
                      params: {
                        DynamicPlaceholderId: '5',
                      },
                      fields: {
                        Text: {
                          value:
                            '<div class="ck-content"><p><img style="aspect-ratio:162/48;" src="-/media/AAA800816F654646B55056DE51FEDF49.ashx" alt="" width="162" height="48" /></p></div>',
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        }}
        fields={{
          TitleOne: createTextField('Furniture'),
          TitleTwo: createTextField('Services'),
          TitleThree: createTextField('Support'),
          TitleFour: createTextField('Follow Us'),
          TitleFive: createTextField('Install App'),
          CopyrightText: createTextField('Copyright © 2025'),
          PolicyText: createLinkField('Privacy Policy'),
          TermsText: createLinkField('Terms & Conditions'),
          Description: createRichTextField(),
          Logo: createImageField('logo'),
        }}
      />
    );
  },
};

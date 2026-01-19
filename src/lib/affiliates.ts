/**
 * Affiliate configuration for monetization
 * These links appear in the sidebar after data is cleaned
 */

export interface AffiliateLink {
    id: string;
    name: string;
    description: string;
    url: string;
    icon: string;
    category: 'visualization' | 'automation' | 'storage';
}

export const affiliateLinks: AffiliateLink[] = [
    {
        id: 'airtable',
        name: 'Airtable',
        description: 'Organize your cleaned data in a visual database',
        url: 'https://airtable.com/invite/r/placeholder', // Replace with actual affiliate link
        icon: '📊',
        category: 'visualization',
    },
    {
        id: 'notion',
        name: 'Notion',
        description: 'Import your data into Notion tables',
        url: 'https://www.notion.so/?ref=placeholder', // Replace with actual affiliate link
        icon: '📝',
        category: 'visualization',
    },
    {
        id: 'zapier',
        name: 'Zapier',
        description: 'Automate this workflow with 5,000+ apps',
        url: 'https://zapier.com/?ref=placeholder', // Replace with actual affiliate link
        icon: '⚡',
        category: 'automation',
    },
    {
        id: 'google-sheets',
        name: 'Google Sheets',
        description: 'Open cleaned file in Google Sheets',
        url: 'https://sheets.google.com',
        icon: '📗',
        category: 'storage',
    },
];

export function getAffiliatesByCategory(category: AffiliateLink['category']): AffiliateLink[] {
    return affiliateLinks.filter(link => link.category === category);
}

// Sanity connection smoke test
// Run: node scripts/sanity-smoke-test.js
// Requires: NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  perspective: 'published'
});

const testQueries = [
  {
    name: 'Sample Article',
    query: '*[_type == "article"][0]{_id, title, "slug": slug.current, type, prefecture}'
  },
  {
    name: 'Article Count',
    query: 'count(*[_type == "article"])'
  },
  {
    name: 'Recent Articles',
    query: '*[_type == "article"] | order(publishedAt desc)[0...3]{title, publishedAt, type}'
  }
];

async function runSmokeTest() {
  console.log('🧪 Sanity Connection Smoke Test');
  console.log('================================');

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID is not set in environment variables');
    console.log('💡 Create .env.local file with: NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id');
    process.exit(1);
  }

  console.log(`🔗 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`📊 Dataset: production`);
  console.log('');

  for (const test of testQueries) {
    try {
      console.log(`⏳ Testing: ${test.name}...`);
      const result = await client.fetch(test.query);

      if (test.name === 'Article Count') {
        console.log(`✅ ${test.name}: ${result} articles found`);
      } else if (Array.isArray(result)) {
        console.log(`✅ ${test.name}: ${result.length} results`);
        if (result.length > 0) {
          console.log(`   Sample: ${JSON.stringify(result[0], null, 2)}`);
        }
      } else {
        console.log(`✅ ${test.name}: Success`);
        console.log(`   Result: ${JSON.stringify(result, null, 2)}`);
      }
      console.log('');
    } catch (error) {
      console.error(`❌ ${test.name} failed:`, error.message);
      console.log('');

      if (error.message.includes('401')) {
        console.log('💡 This might be a permissions issue. Ensure:');
        console.log('   - Project ID is correct');
        console.log('   - Dataset "production" exists');
        console.log('   - CORS settings allow your domain');
        console.log('   - Dataset has public read access');
      }

      process.exit(1);
    }
  }

  console.log('🎉 All tests passed! Sanity connection is working correctly.');
  console.log('');
  console.log('✨ Your MVP blog should work with this Sanity configuration.');
}

runSmokeTest().catch(error => {
  console.error('💥 Smoke test failed:', error);
  process.exit(1);
});
const fs = require("fs");
const path = require("path");

function analyzeFeatures() {
  const features = JSON.parse(fs.readFileSync("tracking/features.json", "utf8"));
  
  let stats = {
    total: 0,
    implemented: 0,
    pending: 0,
    categories: {}
  };
  
  function processCategory(category, data) {
    if (!stats.categories[category]) {
      stats.categories[category] = { implemented: 0, pending: 0 };
    }
    
    Object.values(data).forEach(feature => {
      stats.total += feature.implemented.length + feature.pending.length;
      stats.implemented += feature.implemented.length;
      stats.pending += feature.pending.length;
      
      stats.categories[category].implemented += feature.implemented.length;
      stats.categories[category].pending += feature.pending.length;
    });
  }
  
  Object.entries(features).forEach(([category, data]) => {
    processCategory(category, data);
  });
  
  return stats;
}

const stats = analyzeFeatures();
console.log("\nFeature Implementation Status:");
console.log("============================");
console.log(`Total Features: ${stats.total}`);
console.log(`Implemented: ${stats.implemented} (${((stats.implemented/stats.total)*100).toFixed(1)}%)`);
console.log(`Pending: ${stats.pending} (${((stats.pending/stats.total)*100).toFixed(1)}%)\n`);

console.log("By Category:");
Object.entries(stats.categories).forEach(([category, data]) => {
  const total = data.implemented + data.pending;
  console.log(`\n${category}:`);
  console.log(`  Implemented: ${data.implemented}/${total} (${((data.implemented/total)*100).toFixed(1)}%)`);
  console.log(`  Pending: ${data.pending}/${total} (${((data.pending/total)*100).toFixed(1)}%)`);
});

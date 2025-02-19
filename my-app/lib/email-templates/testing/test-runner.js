import { runAllTests } from './scenarios/test-scenarios'

export async function runTests() {
    console.log('Starting email template tests...')
    
    try {
        const results = await runAllTests()
        
        console.log('\nTest Results Summary:')
        console.log(`Total Tests: ${results.summary.total}`)
        console.log(`Passed: ${results.summary.passed}`)
        console.log(`Failed: ${results.summary.total - results.summary.passed}`)
        
        // Log detailed results
        Object.entries(results.results).forEach(([category, tests]) => {
            console.log(`\n${category} Results:`)
            tests.forEach(test => {
                const issues = [
                    ...test.validation.html.issues,
                    ...(test.validation.personalization?.issues || []),
                    ...(test.validation.tracking?.issues || [])
                ]
                
                if (issues.length > 0) {
                    console.log(`❌ Issues found:`)
                    issues.forEach(issue => console.log(`  - ${issue}`))
                } else {
                    console.log(`✅ All checks passed`)
                }
            })
        })
        
        return results
    } catch (error) {
        console.error('Error running tests:', error)
        throw error
    }
}

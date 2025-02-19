import { testUsers, testEvents, testCourses } from '../fixtures/test-data'
import { createTestEmail } from '../helpers/test-helpers'
import { eventTemplate } from '../../specialized/event'
import { trainingTemplate } from '../../specialized/training'
import { partnershipTemplate } from '../../specialized/partnership'

export const testScenarios = {
    eventEmails: async () => {
        const scenarios = [
            {
                name: 'Standard Event Invitation',
                template: eventTemplate.invitation,
                data: testEvents.webinar,
                user: testUsers.standard
            },
            {
                name: 'Healthcare Event Invitation',
                template: eventTemplate.invitation,
                data: {
                    ...testEvents.webinar,
                    title: 'Healthcare AI Symposium'
                },
                user: testUsers.healthcare
            },
            {
                name: 'Legal Event Invitation',
                template: eventTemplate.invitation,
                data: {
                    ...testEvents.webinar,
                    title: 'Legal Tech Conference'
                },
                user: testUsers.legal
            }
        ]

        const results = await Promise.all(
            scenarios.map(scenario => 
                createTestEmail(scenario.template, scenario.data, {
                    userData: scenario.user,
                    tracking: true
                })
            )
        )

        return results
    },

    trainingEmails: async () => {
        const scenarios = [
            {
                name: 'Course Start - Standard',
                template: trainingTemplate.courseStart,
                data: testCourses.basic,
                user: testUsers.standard
            },
            {
                name: 'Course Progress - Healthcare',
                template: trainingTemplate.progress,
                data: {
                    ...testCourses.basic,
                    progress: 50,
                    nextSteps: ['Complete Module 2', 'Take Quiz']
                },
                user: testUsers.healthcare
            }
        ]

        const results = await Promise.all(
            scenarios.map(scenario => 
                createTestEmail(scenario.template, scenario.data, {
                    userData: scenario.user,
                    tracking: true
                })
            )
        )

        return results
    },

    edgeCases: async () => {
        const scenarios = [
            {
                name: 'Missing User Data',
                template: eventTemplate.invitation,
                data: testEvents.webinar,
                user: {}
            },
            {
                name: 'Long Content',
                template: eventTemplate.invitation,
                data: {
                    ...testEvents.webinar,
                    description: 'A'.repeat(1000)
                },
                user: testUsers.standard
            },
            {
                name: 'Special Characters',
                template: eventTemplate.invitation,
                data: {
                    ...testEvents.webinar,
                    title: '特殊文字 & <script>alert("test")</script>'
                },
                user: testUsers.standard
            }
        ]

        const results = await Promise.all(
            scenarios.map(scenario => 
                createTestEmail(scenario.template, scenario.data, {
                    userData: scenario.user,
                    tracking: true
                })
            )
        )

        return results
    }
}

export const runAllTests = async () => {
    const results = {
        eventEmails: await testScenarios.eventEmails(),
        trainingEmails: await testScenarios.trainingEmails(),
        edgeCases: await testScenarios.edgeCases()
    }

    return {
        results,
        summary: {
            total: Object.values(results).flat().length,
            passed: Object.values(results)
                .flat()
                .filter(r => 
                    r.validation.html.valid && 
                    (!r.validation.personalization || r.validation.personalization.valid) &&
                    (!r.validation.tracking || r.validation.tracking.valid)
                ).length
        }
    }
}

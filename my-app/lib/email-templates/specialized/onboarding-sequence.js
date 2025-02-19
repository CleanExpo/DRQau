import { baseTemplate } from '../base'

export const onboardingSequenceTemplate = (name, step) => {
    const steps = {
        welcome: {
            title: "Getting Started with ConsultAI",
            content: `
                <div style="padding: 20px;">
                    <h2 style="color: #0284c7; margin-bottom: 20px;">Welcome to Your Journey!</h2>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333;">Your Next Steps:</h3>
                        <ol style="color: #666; margin: 15px 0;">
                            <li style="margin-bottom: 10px;">Complete your profile</li>
                            <li style="margin-bottom: 10px;">Set your availability</li>
                            <li style="margin-bottom: 10px;">Connect your calendar</li>
                            <li style="margin-bottom: 10px;">Explore AI features</li>
                        </ol>
                    </div>

                    <div style="text-align: center; margin-top: 30px;">
                        <a href="${process.env.NEXTAUTH_URL}/onboarding"
                           style="display: inline-block; padding: 12px 24px; background: #0284c7; color: white; text-decoration: none; border-radius: 5px;">
                            Start Setup
                        </a>
                    </div>
                </div>
            `
        },
        profile: {
            title: "Complete Your Profile",
            content: `
                <div style="padding: 20px;">
                    <h2 style="color: #0284c7; margin-bottom: 20px;">Enhance Your Professional Presence</h2>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333;">Profile Checklist:</h3>
                        <ul style="color: #666; margin: 15px 0;">
                            <li style="margin-bottom: 10px;">Add a professional photo</li>
                            <li style="margin-bottom: 10px;">Write your bio</li>
                            <li style="margin-bottom: 10px;">List your expertise</li>
                            <li style="margin-bottom: 10px;">Set your preferences</li>
                        </ul>
                    </div>

                    <div style="text-align: center; margin-top: 30px;">
                        <a href="${process.env.NEXTAUTH_URL}/profile/edit"
                           style="display: inline-block; padding: 12px 24px; background: #0284c7; color: white; text-decoration: none; border-radius: 5px;">
                            Complete Profile
                        </a>
                    </div>
                </div>
            `
        }
    }

    return baseTemplate(steps[step]?.content || steps.welcome.content)
}

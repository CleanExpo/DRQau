import { baseTemplate } from '../base'

export const milestoneAchievementTemplate = (name, achievement) => {
    const content = `
        <div style="text-align: center; padding: 20px;">
            <div style="margin-bottom: 30px;">
                <img src="${process.env.NEXTAUTH_URL}/images/achievements/${achievement.icon}.png" 
                     alt="${achievement.title}" 
                     style="width: 100px; height: 100px;"
                />
            </div>

            <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">
                Congratulations${name ? ` ${name}` : ''}!
            </h1>
            
            <div style="background-color: #f0f9ff; padding: 25px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #0284c7; font-size: 20px; margin-bottom: 15px;">
                    ${achievement.title}
                </h2>
                
                <p style="color: #666; margin-bottom: 20px; font-size: 16px;">
                    ${achievement.description}
                </p>

                ${achievement.stats ? `
                    <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 20px;">
                        <h3 style="color: #333; font-size: 16px; margin-bottom: 10px;">Your Progress:</h3>
                        <div style="color: #666;">
                            ${Object.entries(achievement.stats).map(([key, value]) => `
                                <div style="margin-bottom: 8px;">
                                    <strong>${key}:</strong> ${value}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>

            <div style="margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL}/achievements" 
                   style="display: inline-block; padding: 12px 24px; background-color: #0284c7; color: white; text-decoration: none; border-radius: 5px;">
                    View All Achievements
                </a>
            </div>

            <div style="margin-top: 20px; padding: 20px; background-color: #f8f9fa; border-radius: 5px; text-align: left;">
                <h3 style="color: #333; font-size: 16px; margin-bottom: 10px;">Next Milestone:</h3>
                <p style="color: #666; margin: 0;">${achievement.nextMilestone}</p>
            </div>
        </div>
    `
    return baseTemplate(content)
}

export const emailValidators = {
    validateHtml: (html) => {
        const issues = []

        // Check HTML structure
        if (!html.includes('<!DOCTYPE html>')) {
            issues.push('Missing DOCTYPE')
        }
        if (!html.includes('<meta name="viewport"')) {
            issues.push('Missing viewport meta tag')
        }

        // Check responsive design
        if (!html.includes('@media')) {
            issues.push('Missing media queries')
        }

        // Check accessibility
        const imgTags = html.match(/<img[^>]+>/g) || []
        imgTags.forEach(img => {
            if (!img.includes('alt=')) {
                issues.push('Image missing alt text')
            }
        })

        // Check for broken links
        const links = html.match(/<a[^>]+>/g) || []
        links.forEach(link => {
            if (link.includes('href="#"') || link.includes('href=""')) {
                issues.push('Empty or invalid link found')
            }
        })

        return {
            valid: issues.length === 0,
            issues
        }
    },

    validatePersonalization: (html, userData) => {
        const issues = []

        // Check if user name is included
        if (userData.name && !html.includes(userData.name)) {
            issues.push('User name not found in email')
        }

        // Check industry-specific content
        if (userData.industry) {
            const industryTerms = {
                healthcare: ['patient', 'medical', 'health'],
                legal: ['client', 'legal', 'case'],
                technology: ['tech', 'software', 'digital']
            }

            const terms = industryTerms[userData.industry] || []
            const hasIndustryTerms = terms.some(term => 
                html.toLowerCase().includes(term.toLowerCase())
            )

            if (!hasIndustryTerms) {
                issues.push(`No ${userData.industry}-specific terms found`)
            }
        }

        return {
            valid: issues.length === 0,
            issues
        }
    },

    validateTracking: (html) => {
        const issues = []

        // Check tracking pixel
        if (!html.includes('pixel.gif')) {
            issues.push('Missing tracking pixel')
        }

        // Check click tracking
        if (!html.includes('click-tracking')) {
            issues.push('Missing click tracking')
        }

        return {
            valid: issues.length === 0,
            issues
        }
    }
}

export const renderTemplate = async (template, data, options = {}) => {
    const rendered = await template(data)
    const validation = {
        html: emailValidators.validateHtml(rendered),
        personalization: options.userData ? 
            emailValidators.validatePersonalization(rendered, options.userData) : 
            null,
        tracking: options.tracking ? 
            emailValidators.validateTracking(rendered) : 
            null
    }

    return {
        html: rendered,
        validation
    }
}

export const createTestEmail = async (template, data, options = {}) => {
    const result = await renderTemplate(template, data, options)
    return {
        ...result,
        preview: {
            desktop: `data:text/html;base64,${Buffer.from(result.html).toString('base64')}`,
            mobile: `data:text/html;base64,${Buffer.from(result.html).toString('base64')}`
        },
        testData: data
    }
}

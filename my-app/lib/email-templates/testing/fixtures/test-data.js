export const testUsers = {
    standard: {
        id: "user1",
        name: "John Doe",
        email: "john@example.com",
        industry: "technology",
        preferences: {
            emailFrequency: "daily",
            language: "en"
        }
    },
    healthcare: {
        id: "user2",
        name: "Dr. Jane Smith",
        email: "jane@hospital.com",
        industry: "healthcare",
        preferences: {
            emailFrequency: "weekly",
            language: "en"
        }
    },
    legal: {
        id: "user3",
        name: "Atty. Robert Brown",
        email: "robert@law.com",
        industry: "legal",
        preferences: {
            emailFrequency: "daily",
            language: "en"
        }
    }
}

export const testEvents = {
    webinar: {
        id: "event1",
        title: "AI in Business Webinar",
        description: "Learn how AI is transforming business operations",
        datetime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        location: "Online",
        rsvpUrl: "https://example.com/rsvp/webinar",
        calendarUrl: "https://example.com/calendar/webinar"
    },
    conference: {
        id: "event2",
        title: "Annual Tech Conference",
        description: "Join us for our annual technology conference",
        datetime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        location: "Convention Center",
        rsvpUrl: "https://example.com/rsvp/conference",
        calendarUrl: "https://example.com/calendar/conference"
    }
}

export const testCourses = {
    basic: {
        id: "course1",
        courseName: "AI Fundamentals",
        modules: [
            { name: "Introduction to AI", duration: "1 week" },
            { name: "Machine Learning Basics", duration: "2 weeks" }
        ],
        startUrl: "https://example.com/courses/ai-fundamentals"
    },
    advanced: {
        id: "course2",
        courseName: "Advanced AI Implementation",
        modules: [
            { name: "Deep Learning", duration: "3 weeks" },
            { name: "Neural Networks", duration: "4 weeks" }
        ],
        startUrl: "https://example.com/courses/advanced-ai"
    }
}

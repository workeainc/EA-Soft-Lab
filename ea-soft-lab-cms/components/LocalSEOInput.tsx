import React from 'react'
import {set, unset} from 'sanity'
import {StringInputProps} from 'sanity'
import {Card, Stack, Button, Flex, Box, Text, Heading} from '@sanity/ui'
import {LocalSEODashboard} from './LocalSEODashboard'

export const LocalSEOInput: React.FC<StringInputProps> = (props) => {
  const {value, onChange, document} = props

  const handleUpdate = (field: string, newValue: any) => {
    onChange(set(newValue, [field]))
  }

  const handleUnset = (field: string) => {
    onChange(unset([field]))
  }

  return (
    <Stack space={4}>
      {/* Dashboard Preview */}
      <Card padding={4} tone="primary">
        <Stack space={3}>
          <Flex align="center" justify="space-between">
            <Heading size={2}>Local SEO Dashboard Preview</Heading>
            <Button 
              mode="ghost" 
              tone="primary"
              onClick={() => {
                // Trigger a refresh of the dashboard data
                console.log('Refreshing Local SEO data...')
              }}
            >
              Refresh Data
            </Button>
          </Flex>
          
          <Box style={{maxHeight: '600px', overflow: 'auto'}}>
            <LocalSEODashboard document={document} />
          </Box>
        </Stack>
      </Card>

      {/* Quick Actions */}
      <Card padding={4}>
        <Stack space={3}>
          <Heading size={2}>Quick Actions</Heading>
          
          <Flex gap={3} wrap>
            <Button 
              mode="ghost" 
              tone="primary"
              onClick={() => {
                // Simulate updating GMB data
                const updatedGmb = {
                  views: Math.floor(Math.random() * 20000) + 10000,
                  clicks: Math.floor(Math.random() * 5000) + 2000,
                  calls: Math.floor(Math.random() * 1000) + 500,
                  directionRequests: Math.floor(Math.random() * 2000) + 1000,
                  reviews: Math.floor(Math.random() * 100) + 30,
                  averageRating: (Math.random() * 2 + 3.5).toFixed(1)
                }
                
                // Update the document with new GMB data
                Object.entries(updatedGmb).forEach(([key, value]) => {
                  handleUpdate(`googleMyBusiness.${key}`, value)
                })
              }}
            >
              Update GMB Metrics
            </Button>
            
            <Button 
              mode="ghost" 
              tone="primary"
              onClick={() => {
                // Simulate updating local SEO scores
                const updatedScores = {
                  overallScore: Math.floor(Math.random() * 40) + 60,
                  gmbScore: Math.floor(Math.random() * 30) + 70,
                  rankingsScore: Math.floor(Math.random() * 25) + 75,
                  citationsScore: Math.floor(Math.random() * 20) + 80,
                  reviewsScore: Math.floor(Math.random() * 15) + 85
                }
                
                Object.entries(updatedScores).forEach(([key, value]) => {
                  handleUpdate(`localSEOScore.${key}`, value)
                })
              }}
            >
              Update SEO Scores
            </Button>
            
            <Button 
              mode="ghost" 
              tone="primary"
              onClick={() => {
                // Generate recommendations
                const immediateActions = [
                  "Optimize Google My Business profile with complete information",
                  "Add more customer reviews and respond to existing ones",
                  "Create location-specific landing pages",
                  "Improve local keyword targeting"
                ]
                
                const longTermActions = [
                  "Build local citations and directory listings",
                  "Create local content strategy",
                  "Develop local link building campaign",
                  "Implement local schema markup"
                ]
                
                handleUpdate('recommendations.immediate', immediateActions)
                handleUpdate('recommendations.longTerm', longTermActions)
              }}
            >
              Generate Recommendations
            </Button>
            
            <Button 
              mode="ghost" 
              tone="critical"
              onClick={() => {
                // Clear all data
                const fieldsToClear = [
                  'googleMyBusiness',
                  'localRankings', 
                  'localCompetitors',
                  'localSEOScore',
                  'recommendations'
                ]
                
                fieldsToClear.forEach(field => {
                  handleUnset(field)
                })
              }}
            >
              Clear All Data
            </Button>
          </Flex>
        </Stack>
      </Card>

      {/* Data Status */}
      <Card padding={4} tone="primary">
        <Stack space={3}>
          <Heading size={2}>Data Status</Heading>
          
          <Flex gap={3} wrap>
            <Card padding={3} radius={2} shadow={1}>
              <Stack space={2}>
                <Text size={1} muted>Business Info</Text>
                <Text size={2} weight="semibold">
                  {document?.businessInfo?.name ? '✅ Complete' : '❌ Missing'}
                </Text>
              </Stack>
            </Card>
            
            <Card padding={3} radius={2} shadow={1}>
              <Stack space={2}>
                <Text size={1} muted>GMB Metrics</Text>
                <Text size={2} weight="semibold">
                  {document?.googleMyBusiness?.views ? '✅ Available' : '❌ Not Set'}
                </Text>
              </Stack>
            </Card>
            
            <Card padding={3} radius={2} shadow={1}>
              <Stack space={2}>
                <Text size={1} muted>Local Rankings</Text>
                <Text size={2} weight="semibold">
                  {document?.localRankings?.length > 0 ? '✅ Available' : '❌ Not Set'}
                </Text>
              </Stack>
            </Card>
            
            <Card padding={3} radius={2} shadow={1}>
              <Stack space={2}>
                <Text size={1} muted>SEO Scores</Text>
                <Text size={2} weight="semibold">
                  {document?.localSEOScore?.overallScore ? '✅ Available' : '❌ Not Set'}
                </Text>
              </Stack>
            </Card>
          </Flex>
        </Stack>
      </Card>

      {/* Last Updated */}
      {document?.lastUpdated && (
        <Card padding={4} tone="primary">
          <Text size={1} muted>
            Last Updated: {new Date(document.lastUpdated).toLocaleString()}
          </Text>
        </Card>
      )}
    </Stack>
  )
}

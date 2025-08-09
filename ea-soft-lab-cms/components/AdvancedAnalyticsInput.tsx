import React from 'react'
import {set, unset} from 'sanity'
import {StringInputProps} from 'sanity'
import {Card, Stack, Button, Flex, Box, Text, Heading} from '@sanity/ui'
import {AdvancedAnalyticsDashboard} from './AdvancedAnalyticsDashboard'

export const AdvancedAnalyticsInput: React.FC<StringInputProps> = (props) => {
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
            <Heading size={2}>Advanced Analytics Dashboard Preview</Heading>
            <Button mode="ghost" tone="primary" onClick={() => console.log('Refreshing analytics data...')}>
              Refresh Data
            </Button>
          </Flex>
          <Box style={{maxHeight: '800px', overflow: 'auto'}}>
            <AdvancedAnalyticsDashboard document={document} />
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
                const mockData = {
                  keyMetrics: {
                    pageViews: Math.floor(Math.random() * 20000) + 10000,
                    uniqueVisitors: Math.floor(Math.random() * 12000) + 5000,
                    bounceRate: Math.random() * 50 + 20,
                    avgSessionDuration: Math.floor(Math.random() * 300) + 150,
                    conversionRate: Math.random() * 10 + 2
                  }
                }
                handleUpdate('keyMetrics', mockData.keyMetrics)
              }}
            >
              Update Key Metrics
            </Button>
            <Button 
              mode="ghost" 
              tone="primary" 
              onClick={() => {
                const mockRealTimeData = {
                  activeUsers: Math.floor(Math.random() * 50) + 10,
                  currentPageViews: Math.floor(Math.random() * 200) + 50
                }
                handleUpdate('realTimeData', mockRealTimeData)
              }}
            >
              Update Real-time Data
            </Button>
            <Button 
              mode="ghost" 
              tone="primary" 
              onClick={() => {
                const mockTopPages = [
                  {url: '/', views: Math.floor(Math.random() * 6000) + 3000, conversions: Math.floor(Math.random() * 200) + 100, bounceRate: Math.random() * 30 + 20},
                  {url: '/services', views: Math.floor(Math.random() * 4000) + 2000, conversions: Math.floor(Math.random() * 150) + 50, bounceRate: Math.random() * 30 + 25},
                  {url: '/contact', views: Math.floor(Math.random() * 3500) + 1500, conversions: Math.floor(Math.random() * 300) + 150, bounceRate: Math.random() * 25 + 15}
                ]
                handleUpdate('topPages', mockTopPages)
              }}
            >
              Update Top Pages
            </Button>
            <Button 
              mode="ghost" 
              tone="primary" 
              onClick={() => {
                const mockConversions = {
                  total: Math.floor(Math.random() * 800) + 400,
                  byType: [
                    {type: 'Contact Form', count: Math.floor(Math.random() * 300) + 150, value: Math.floor(Math.random() * 60000) + 30000},
                    {type: 'Phone Call', count: Math.floor(Math.random() * 200) + 100, value: Math.floor(Math.random() * 40000) + 20000},
                    {type: 'Email Signup', count: Math.floor(Math.random() * 150) + 50, value: Math.floor(Math.random() * 15000) + 5000}
                  ]
                }
                handleUpdate('conversions', mockConversions)
              }}
            >
              Update Conversions
            </Button>
          </Flex>
        </Stack>
      </Card>

      {/* Data Status */}
      <Card padding={4} tone="primary">
        <Stack space={3}>
          <Heading size={2}>Data Status</Heading>
          <Stack space={2}>
            <Flex align="center" justify="space-between">
              <Text>Key Metrics</Text>
              <Text size={1} muted>
                {document?.keyMetrics ? '✓ Loaded' : '✗ Missing'}
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text>Top Pages</Text>
              <Text size={1} muted>
                {document?.topPages?.length > 0 ? `✓ ${document.topPages.length} pages` : '✗ Missing'}
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text>User Behavior</Text>
              <Text size={1} muted>
                {document?.userBehavior ? '✓ Loaded' : '✗ Missing'}
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text>Conversions</Text>
              <Text size={1} muted>
                {document?.conversions ? '✓ Loaded' : '✗ Missing'}
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text>Real-time Data</Text>
              <Text size={1} muted>
                {document?.realTimeData ? '✓ Active' : '✗ Inactive'}
              </Text>
            </Flex>
          </Stack>
        </Stack>
      </Card>

      {/* Last Updated */}
      {document?.lastUpdated && (
        <Card padding={4} tone="primary">
          <Stack space={2}>
            <Text size={1} muted>Last Updated</Text>
            <Text>{new Date(document.lastUpdated).toLocaleString()}</Text>
          </Stack>
        </Card>
      )}
    </Stack>
  )
}

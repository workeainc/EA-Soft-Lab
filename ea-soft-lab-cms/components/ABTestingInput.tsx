import React from 'react'
import {set, unset} from 'sanity'
import {StringInputProps} from 'sanity'
import {Card, Stack, Button, Flex, Box, Text, Heading} from '@sanity/ui'
import {ABTestingDashboard} from './ABTestingDashboard'

export const ABTestingInput: React.FC<StringInputProps> = (props) => {
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
            <Heading size={2}>A/B Testing Dashboard Preview</Heading>
            <Button mode="ghost" tone="primary" onClick={() => console.log('Refreshing A/B test data...')}>
              Refresh Data
            </Button>
          </Flex>
          <Box style={{maxHeight: '800px', overflow: 'auto'}}>
            <ABTestingDashboard document={document} />
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
                const mockTestOverview = {
                  activeTests: Math.floor(Math.random() * 5) + 1,
                  completedTests: Math.floor(Math.random() * 20) + 10,
                  totalConversions: Math.floor(Math.random() * 2000) + 1000,
                  avgConfidence: Math.random() * 20 + 80
                }
                handleUpdate('testOverview', mockTestOverview)
              }}
            >
              Update Test Overview
            </Button>
            <Button 
              mode="ghost" 
              tone="primary" 
              onClick={() => {
                const mockResultsSummary = {
                  totalTests: Math.floor(Math.random() * 30) + 10,
                  successfulTests: Math.floor(Math.random() * 20) + 5,
                  improvementRate: Math.random() * 20 + 5,
                  totalRevenueImpact: Math.floor(Math.random() * 100000) + 20000,
                  bestPerformingTest: 'cta-text-test'
                }
                handleUpdate('resultsSummary', mockResultsSummary)
              }}
            >
              Update Results Summary
            </Button>
            <Button 
              mode="ghost" 
              tone="primary" 
              onClick={() => {
                const mockTest = {
                  id: `test-${Date.now()}`,
                  name: 'New Test',
                  description: 'Automatically generated test',
                  status: 'active',
                  variants: [
                    {
                      id: 'control',
                      name: 'Control',
                      traffic: Math.floor(Math.random() * 1000) + 500,
                      conversions: Math.floor(Math.random() * 100) + 20,
                      conversionRate: Math.random() * 10 + 2
                    },
                    {
                      id: 'variant-a',
                      name: 'Variant A',
                      traffic: Math.floor(Math.random() * 1000) + 500,
                      conversions: Math.floor(Math.random() * 100) + 20,
                      conversionRate: Math.random() * 10 + 2
                    }
                  ],
                  metrics: {
                    totalVisitors: Math.floor(Math.random() * 2000) + 1000,
                    totalConversions: Math.floor(Math.random() * 200) + 50,
                    confidence: Math.random() * 30 + 70,
                    winner: null
                  },
                  testType: 'button',
                  startDate: new Date().toISOString()
                }
                
                const currentTests = document?.tests || []
                const updatedTests = [...currentTests, mockTest]
                handleUpdate('tests', updatedTests)
              }}
            >
              Add New Test
            </Button>
            <Button 
              mode="ghost" 
              tone="primary" 
              onClick={() => {
                const mockConfiguration = {
                  defaultTrafficSplit: 50,
                  minimumSampleSize: Math.floor(Math.random() * 500) + 500,
                  confidenceThreshold: Math.floor(Math.random() * 10) + 85,
                  testDuration: Math.floor(Math.random() * 30) + 14,
                  autoStop: true,
                  emailNotifications: true
                }
                handleUpdate('configuration', mockConfiguration)
              }}
            >
              Update Configuration
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
              <Text>Test Overview</Text>
              <Text size={1} muted>
                {document?.testOverview ? '✓ Loaded' : '✗ Missing'}
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text>Active Tests</Text>
              <Text size={1} muted>
                {document?.tests?.filter((test: any) => test.status === 'active').length || 0} active
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text>Completed Tests</Text>
              <Text size={1} muted>
                {document?.tests?.filter((test: any) => test.status === 'completed').length || 0} completed
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text>Results Summary</Text>
              <Text size={1} muted>
                {document?.resultsSummary ? '✓ Loaded' : '✗ Missing'}
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text>Configuration</Text>
              <Text size={1} muted>
                {document?.configuration ? '✓ Loaded' : '✗ Missing'}
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

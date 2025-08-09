import React, {useState, useEffect} from 'react'
import {Card, Text, Stack, Badge, Flex, Box, Heading, Button, Grid} from '@sanity/ui'
import {TestTube, TrendingUp, Users, Target, Activity, CheckCircle, AlertTriangle, Play, Pause, Square} from 'lucide-react'

interface ABTestingDashboardProps {
  document: any
}

export const ABTestingDashboard: React.FC<ABTestingDashboardProps> = ({document}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [abTestData, setAbTestData] = useState<any>(null)

  useEffect(() => {
    // Simulate loading A/B test data
    setTimeout(() => {
      setAbTestData(document || {
        testOverview: {
          activeTests: 3,
          completedTests: 12,
          totalConversions: 1247,
          avgConfidence: 87.3
        },
        tests: [
          {
            id: 'hero-button-test',
            name: 'Hero Button Test',
            description: 'Testing different CTA button styles and text',
            status: 'active',
            variants: [
              {
                id: 'control',
                name: 'Control (Primary Blue)',
                traffic: 1250,
                conversions: 89,
                conversionRate: 7.12
              },
              {
                id: 'variant-a',
                name: 'Variant A (Green)',
                traffic: 1230,
                conversions: 95,
                conversionRate: 7.72
              },
              {
                id: 'variant-b',
                name: 'Variant B (Orange)',
                traffic: 1240,
                conversions: 78,
                conversionRate: 6.29
              }
            ],
            metrics: {
              totalVisitors: 3720,
              totalConversions: 262,
              confidence: 85.2,
              winner: 'variant-a'
            },
            testType: 'button',
            startDate: '2024-01-15'
          },
          {
            id: 'cta-text-test',
            name: 'CTA Text Test',
            description: 'Testing different call-to-action text variations',
            status: 'active',
            variants: [
              {
                id: 'control',
                name: 'Control (Get Started)',
                traffic: 980,
                conversions: 67,
                conversionRate: 6.84
              },
              {
                id: 'variant-a',
                name: 'Variant A (Learn More)',
                traffic: 975,
                conversions: 72,
                conversionRate: 7.38
              },
              {
                id: 'variant-b',
                name: 'Variant B (Contact Us)',
                traffic: 970,
                conversions: 81,
                conversionRate: 8.35
              }
            ],
            metrics: {
              totalVisitors: 2925,
              totalConversions: 220,
              confidence: 92.1,
              winner: 'variant-b'
            },
            testType: 'text',
            startDate: '2024-01-20'
          }
        ],
        resultsSummary: {
          totalTests: 15,
          successfulTests: 9,
          improvementRate: 12.5,
          totalRevenueImpact: 45600,
          bestPerformingTest: 'cta-text-test'
        }
      })
      setIsLoading(false)
    }, 1000)
  }, [document])

  if (isLoading) {
    return (
      <Card padding={4} tone="primary">
        <Stack space={3}>
          <Flex align="center" gap={3}>
            <Activity className="animate-spin" />
            <Text>Loading A/B Testing Dashboard...</Text>
          </Flex>
        </Stack>
      </Card>
    )
  }

  const {testOverview, tests, resultsSummary} = abTestData

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play size={16} />
      case 'paused':
        return <Pause size={16} />
      case 'completed':
        return <Square size={16} />
      default:
        return <AlertTriangle size={16} />
    }
  }

  const getStatusTone = (status: string) => {
    switch (status) {
      case 'active':
        return 'positive'
      case 'paused':
        return 'caution'
      case 'completed':
        return 'primary'
      default:
        return 'critical'
    }
  }

  return (
    <Stack space={4}>
      {/* Header */}
      <Card padding={4} tone="primary">
        <Stack space={3}>
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={3}>
              <TestTube size={24} />
              <Heading size={2}>A/B Testing Dashboard</Heading>
            </Flex>
            <Badge tone="positive">Live</Badge>
          </Flex>
          <Text size={1} muted>
            Optimize your website with data-driven experiments
          </Text>
        </Stack>
      </Card>

      {/* Test Overview */}
      <Card padding={4}>
        <Stack space={4}>
          <Heading size={2}>Test Overview</Heading>
          <Grid columns={[1, 2, 4]} gap={3}>
            <Card padding={3} tone="primary">
              <Stack space={2}>
                <Flex align="center" gap={2}>
                  <Play size={16} />
                  <Text size={1} muted>Active Tests</Text>
                </Flex>
                <Text size={3} weight="semibold">
                  {testOverview.activeTests}
                </Text>
              </Stack>
            </Card>
            <Card padding={3} tone="primary">
              <Stack space={2}>
                <Flex align="center" gap={2}>
                  <CheckCircle size={16} />
                  <Text size={1} muted>Completed Tests</Text>
                </Flex>
                <Text size={3} weight="semibold">
                  {testOverview.completedTests}
                </Text>
              </Stack>
            </Card>
            <Card padding={3} tone="primary">
              <Stack space={2}>
                <Flex align="center" gap={2}>
                  <Target size={16} />
                  <Text size={1} muted>Total Conversions</Text>
                </Flex>
                <Text size={3} weight="semibold">
                  {testOverview.totalConversions.toLocaleString()}
                </Text>
              </Stack>
            </Card>
            <Card padding={3} tone="primary">
              <Stack space={2}>
                <Flex align="center" gap={2}>
                  <TrendingUp size={16} />
                  <Text size={1} muted>Avg Confidence</Text>
                </Flex>
                <Text size={3} weight="semibold">
                  {testOverview.avgConfidence}%
                </Text>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Card>

      {/* Active Tests */}
      <Card padding={4}>
        <Stack space={4}>
          <Heading size={2}>Active Tests</Heading>
          <Stack space={4}>
            {tests.filter((test: any) => test.status === 'active').map((test: any, index: number) => (
              <Card key={index} padding={4}>
                <Stack space={4}>
                  <Flex align="center" justify="space-between">
                    <Stack space={2}>
                      <Flex align="center" gap={2}>
                        <Text weight="semibold">{test.name}</Text>
                        <Badge tone={getStatusTone(test.status)}>
                          {getStatusIcon(test.status)}
                          {test.status}
                        </Badge>
                      </Flex>
                      <Text size={1} muted>{test.description}</Text>
                    </Stack>
                    <Stack space={1} align="end">
                      <Text size={1} weight="semibold">
                        {test.metrics.confidence}% confidence
                      </Text>
                      <Text size={1} muted>
                        {test.metrics.totalVisitors} visitors
                      </Text>
                    </Stack>
                  </Flex>

                  {/* Variants */}
                  <Stack space={3}>
                    <Text size={1} weight="semibold">Variants</Text>
                    <Grid columns={[1, 2, 3]} gap={3}>
                      {test.variants.map((variant: any, vIndex: number) => (
                        <Card key={vIndex} padding={3} tone={variant.id === test.metrics.winner ? 'positive' : 'primary'}>
                          <Stack space={2}>
                            <Flex align="center" justify="space-between">
                              <Text weight="semibold">{variant.name}</Text>
                              {variant.id === test.metrics.winner && (
                                <Badge tone="positive">Winner</Badge>
                              )}
                            </Flex>
                            <Stack space={1}>
                              <Text size={1} muted>
                                {variant.traffic.toLocaleString()} visitors
                              </Text>
                              <Text size={1} muted>
                                {variant.conversions} conversions
                              </Text>
                              <Text size={1} weight="semibold">
                                {variant.conversionRate}% conv. rate
                              </Text>
                            </Stack>
                          </Stack>
                        </Card>
                      ))}
                    </Grid>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Card>

      {/* Results Summary */}
      <Card padding={4}>
        <Stack space={4}>
          <Heading size={2}>Results Summary</Heading>
          <Grid columns={[1, 2]} gap={4}>
            <Card padding={3}>
              <Stack space={2}>
                <Text weight="semibold">Success Rate</Text>
                <Text size={3}>
                  {Math.round((resultsSummary.successfulTests / resultsSummary.totalTests) * 100)}%
                </Text>
                <Text size={1} muted>
                  {resultsSummary.successfulTests} of {resultsSummary.totalTests} tests successful
                </Text>
              </Stack>
            </Card>
            <Card padding={3}>
              <Stack space={2}>
                <Text weight="semibold">Average Improvement</Text>
                <Text size={3}>
                  {resultsSummary.improvementRate}%
                </Text>
                <Text size={1} muted>
                  Average lift across all tests
                </Text>
              </Stack>
            </Card>
            <Card padding={3}>
              <Stack space={2}>
                <Text weight="semibold">Revenue Impact</Text>
                <Text size={3}>
                  ${resultsSummary.totalRevenueImpact.toLocaleString()}
                </Text>
                <Text size={1} muted>
                  Total revenue increase from tests
                </Text>
              </Stack>
            </Card>
            <Card padding={3}>
              <Stack space={2}>
                <Text weight="semibold">Best Test</Text>
                <Text size={3}>
                  {resultsSummary.bestPerformingTest}
                </Text>
                <Text size={1} muted>
                  Highest performing test to date
                </Text>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Card>

      {/* Quick Actions */}
      <Card padding={4}>
        <Stack space={3}>
          <Heading size={2}>Quick Actions</Heading>
          <Flex gap={3} wrap>
            <Button mode="ghost" tone="primary" icon={TestTube}>
              Create New Test
            </Button>
            <Button mode="ghost" tone="primary" icon={TrendingUp}>
              View All Results
            </Button>
            <Button mode="ghost" tone="primary" icon={Target}>
              Test Recommendations
            </Button>
            <Button mode="ghost" tone="primary" icon={Activity}>
              Performance Insights
            </Button>
          </Flex>
        </Stack>
      </Card>
    </Stack>
  )
}

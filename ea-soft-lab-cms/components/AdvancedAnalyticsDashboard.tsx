import React, {useState, useEffect} from 'react'
import {Card, Text, Stack, Badge, Flex, Box, Heading, Button, Grid} from '@sanity/ui'
import {BarChart3, Users, MousePointer, TrendingUp, Activity, Eye, Target, Zap} from 'lucide-react'

interface AdvancedAnalyticsDashboardProps {
  document: any
}

export const AdvancedAnalyticsDashboard: React.FC<AdvancedAnalyticsDashboardProps> = ({document}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState<any>(null)

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      setAnalyticsData(document || {
        keyMetrics: {
          pageViews: 15420,
          uniqueVisitors: 8920,
          bounceRate: 32.5,
          avgSessionDuration: 245,
          conversionRate: 4.8
        },
        topPages: [
          {url: '/', views: 5420, conversions: 156, bounceRate: 28.5},
          {url: '/services', views: 3240, conversions: 89, bounceRate: 35.2},
          {url: '/contact', views: 2890, conversions: 234, bounceRate: 22.1}
        ],
        userBehavior: {
          deviceBreakdown: [
            {device: 'Desktop', percentage: 45},
            {device: 'Mobile', percentage: 42},
            {device: 'Tablet', percentage: 13}
          ],
          trafficSources: [
            {source: 'Organic Search', percentage: 52},
            {source: 'Direct', percentage: 28},
            {source: 'Social Media', percentage: 12},
            {source: 'Referral', percentage: 8}
          ]
        },
        conversions: {
          total: 591,
          byType: [
            {type: 'Contact Form', count: 234, value: 46800},
            {type: 'Phone Call', count: 156, value: 31200},
            {type: 'Email Signup', count: 89, value: 8900}
          ]
        },
        realTimeData: {
          activeUsers: 23,
          currentPageViews: 156
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
            <Text>Loading Analytics Dashboard...</Text>
          </Flex>
        </Stack>
      </Card>
    )
  }

  const {keyMetrics, topPages, userBehavior, conversions, realTimeData} = analyticsData

  return (
    <Stack space={4}>
      {/* Header */}
      <Card padding={4} tone="primary">
        <Stack space={3}>
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={3}>
              <BarChart3 size={24} />
              <Heading size={2}>Advanced Analytics Dashboard</Heading>
            </Flex>
            <Badge tone="positive">Real-time</Badge>
          </Flex>
          <Text size={1} muted>
            Comprehensive analytics and user behavior insights
          </Text>
        </Stack>
      </Card>

      {/* Key Metrics */}
      <Card padding={4}>
        <Stack space={4}>
          <Heading size={2}>Key Metrics</Heading>
          <Grid columns={[1, 2, 5]} gap={3}>
            <Card padding={3} tone="primary">
              <Stack space={2}>
                <Flex align="center" gap={2}>
                  <Eye size={16} />
                  <Text size={1} muted>Page Views</Text>
                </Flex>
                <Text size={3} weight="semibold">
                  {keyMetrics.pageViews.toLocaleString()}
                </Text>
              </Stack>
            </Card>
            <Card padding={3} tone="primary">
              <Stack space={2}>
                <Flex align="center" gap={2}>
                  <Users size={16} />
                  <Text size={1} muted>Unique Visitors</Text>
                </Flex>
                <Text size={3} weight="semibold">
                  {keyMetrics.uniqueVisitors.toLocaleString()}
                </Text>
              </Stack>
            </Card>
            <Card padding={3} tone="primary">
              <Stack space={2}>
                <Flex align="center" gap={2}>
                  <Target size={16} />
                  <Text size={1} muted>Bounce Rate</Text>
                </Flex>
                <Text size={3} weight="semibold">
                  {keyMetrics.bounceRate}%
                </Text>
              </Stack>
            </Card>
            <Card padding={3} tone="primary">
              <Stack space={2}>
                <Flex align="center" gap={2}>
                  <Activity size={16} />
                  <Text size={1} muted>Avg Session</Text>
                </Flex>
                <Text size={3} weight="semibold">
                  {Math.floor(keyMetrics.avgSessionDuration / 60)}m {keyMetrics.avgSessionDuration % 60}s
                </Text>
              </Stack>
            </Card>
            <Card padding={3} tone="primary">
              <Stack space={2}>
                <Flex align="center" gap={2}>
                  <TrendingUp size={16} />
                  <Text size={1} muted>Conversion Rate</Text>
                </Flex>
                <Text size={3} weight="semibold">
                  {keyMetrics.conversionRate}%
                </Text>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Card>

      {/* Real-time Data */}
      <Card padding={4}>
        <Stack space={4}>
          <Heading size={2}>Real-time Activity</Heading>
          <Grid columns={[1, 2]} gap={3}>
            <Card padding={3} tone="positive">
              <Stack space={2}>
                <Flex align="center" gap={2}>
                  <Users size={16} />
                  <Text size={1} muted>Active Users</Text>
                </Flex>
                <Text size={3} weight="semibold">
                  {realTimeData.activeUsers}
                </Text>
              </Stack>
            </Card>
            <Card padding={3} tone="positive">
              <Stack space={2}>
                <Flex align="center" gap={2}>
                  <Eye size={16} />
                  <Text size={1} muted>Current Page Views</Text>
                </Flex>
                <Text size={3} weight="semibold">
                  {realTimeData.currentPageViews}
                </Text>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Card>

      {/* Top Pages */}
      <Card padding={4}>
        <Stack space={4}>
          <Heading size={2}>Top Performing Pages</Heading>
          <Stack space={3}>
            {topPages.map((page: any, index: number) => (
              <Card key={index} padding={3}>
                <Flex align="center" justify="space-between">
                  <Stack space={1}>
                    <Text weight="semibold">{page.url}</Text>
                    <Text size={1} muted>
                      {page.views.toLocaleString()} views • {page.conversions} conversions
                    </Text>
                  </Stack>
                  <Stack space={1} align="end">
                    <Text size={1} weight="semibold">
                      {page.conversionRate}% conv. rate
                    </Text>
                    <Text size={1} muted>
                      {page.bounceRate}% bounce
                    </Text>
                  </Stack>
                </Flex>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Card>

      {/* User Behavior */}
      <Grid columns={[1, 2]} gap={4}>
        <Card padding={4}>
          <Stack space={4}>
            <Heading size={2}>Device Breakdown</Heading>
            <Stack space={3}>
              {userBehavior.deviceBreakdown.map((device: any, index: number) => (
                <Card key={index} padding={3}>
                  <Flex align="center" justify="space-between">
                    <Text weight="semibold">{device.device}</Text>
                    <Badge tone="primary">{device.percentage}%</Badge>
                  </Flex>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Card>

        <Card padding={4}>
          <Stack space={4}>
            <Heading size={2}>Traffic Sources</Heading>
            <Stack space={3}>
              {userBehavior.trafficSources.map((source: any, index: number) => (
                <Card key={index} padding={3}>
                  <Flex align="center" justify="space-between">
                    <Text weight="semibold">{source.source}</Text>
                    <Badge tone="primary">{source.percentage}%</Badge>
                  </Flex>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Card>
      </Grid>

      {/* Conversions */}
      <Card padding={4}>
        <Stack space={4}>
          <Heading size={2}>Conversion Analysis</Heading>
          <Stack space={3}>
            {conversions.byType.map((conversion: any, index: number) => (
              <Card key={index} padding={3}>
                <Flex align="center" justify="space-between">
                  <Stack space={1}>
                    <Text weight="semibold">{conversion.type}</Text>
                    <Text size={1} muted>
                      {conversion.count} conversions
                    </Text>
                  </Stack>
                  <Stack space={1} align="end">
                    <Text weight="semibold">
                      ${conversion.value.toLocaleString()}
                    </Text>
                    <Text size={1} muted>
                      ${Math.round(conversion.value / conversion.count).toLocaleString()} avg
                    </Text>
                  </Stack>
                </Flex>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Card>

      {/* Action Buttons */}
      <Card padding={4}>
        <Stack space={3}>
          <Heading size={2}>Quick Actions</Heading>
          <Flex gap={3} wrap>
            <Button mode="ghost" tone="primary" icon={Zap}>
              Export Report
            </Button>
            <Button mode="ghost" tone="primary" icon={BarChart3}>
              View Detailed Analytics
            </Button>
            <Button mode="ghost" tone="primary" icon={MousePointer}>
              Heatmap Analysis
            </Button>
            <Button mode="ghost" tone="primary" icon={TrendingUp}>
              Performance Insights
            </Button>
          </Flex>
        </Stack>
      </Card>
    </Stack>
  )
}

import React, {useState, useEffect} from 'react'
import {Card, Text, Stack, Badge, Flex, Box, Heading, Button} from '@sanity/ui'
import {BarChart3, MapPin, Star, Users, TrendingUp, AlertTriangle} from 'lucide-react'

interface LocalSEODashboardProps {
  document: any
}

export const LocalSEODashboard: React.FC<LocalSEODashboardProps> = ({document}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [metrics, setMetrics] = useState<any>(null)

  useEffect(() => {
    if (document) {
      // Simulate loading metrics
      setIsLoading(true)
      setTimeout(() => {
        setMetrics({
          gmb: document.googleMyBusiness || {},
          rankings: document.localRankings || [],
          competitors: document.localCompetitors || [],
          score: document.localSEOScore || {},
          recommendations: document.recommendations || {}
        })
        setIsLoading(false)
      }, 1000)
    }
  }, [document])

  if (isLoading) {
    return (
      <Card padding={4}>
        <Text>Loading Local SEO metrics...</Text>
      </Card>
    )
  }

  if (!metrics) {
    return (
      <Card padding={4}>
        <Text>No Local SEO data available</Text>
      </Card>
    )
  }

  const businessInfo = document?.businessInfo || {}
  const {gmb, rankings, competitors, score, recommendations} = metrics

  return (
    <Stack space={4}>
      {/* Header */}
      <Card padding={4} tone="primary">
        <Flex align="center" gap={3}>
          <MapPin size={24} />
          <Box>
            <Heading size={3}>Local SEO Dashboard</Heading>
            <Text size={1} muted>
              {businessInfo.name} - {businessInfo.city}, {businessInfo.state}
            </Text>
          </Box>
        </Flex>
      </Card>

      {/* Google My Business Metrics */}
      <Card padding={4}>
        <Stack space={3}>
          <Flex align="center" gap={2}>
            <Star size={20} />
            <Heading size={2}>Google My Business</Heading>
          </Flex>
          
          <Flex gap={3} wrap="wrap">
            <Card padding={3} radius={2} shadow={1}>
              <Stack space={2}>
                <Text size={1} muted>Profile Views</Text>
                <Text size={3} weight="semibold">{gmb.views?.toLocaleString() || '0'}</Text>
              </Stack>
            </Card>
            
            <Card padding={3} radius={2} shadow={1}>
              <Stack space={2}>
                <Text size={1} muted>Website Clicks</Text>
                <Text size={3} weight="semibold">{gmb.clicks?.toLocaleString() || '0'}</Text>
              </Stack>
            </Card>
            
            <Card padding={3} radius={2} shadow={1}>
              <Stack space={2}>
                <Text size={1} muted>Phone Calls</Text>
                <Text size={3} weight="semibold">{gmb.calls?.toLocaleString() || '0'}</Text>
              </Stack>
            </Card>
            
            <Card padding={3} radius={2} shadow={1}>
              <Stack space={2}>
                <Text size={1} muted>Direction Requests</Text>
                <Text size={3} weight="semibold">{gmb.directionRequests?.toLocaleString() || '0'}</Text>
              </Stack>
            </Card>
            
            <Card padding={3} radius={2} shadow={1}>
              <Stack space={2}>
                <Text size={1} muted>Reviews</Text>
                <Text size={3} weight="semibold">{gmb.reviews || '0'}</Text>
              </Stack>
            </Card>
            
            <Card padding={3} radius={2} shadow={1}>
              <Stack space={2}>
                <Text size={1} muted>Average Rating</Text>
                <Text size={3} weight="semibold">{gmb.averageRating || '0'}/5</Text>
              </Stack>
            </Card>
          </Flex>
        </Stack>
      </Card>

      {/* Local SEO Score */}
      <Card padding={4}>
        <Stack space={3}>
          <Flex align="center" gap={2}>
            <TrendingUp size={20} />
            <Heading size={2}>Local SEO Score</Heading>
          </Flex>
          
          <Flex gap={3} wrap="wrap">
            <Card padding={3} radius={2} shadow={1} tone={score.overallScore >= 80 ? 'positive' : score.overallScore >= 60 ? 'caution' : 'critical'}>
              <Stack space={2}>
                <Text size={1} muted>Overall Score</Text>
                <Text size={4} weight="semibold">{score.overallScore || 0}%</Text>
              </Stack>
            </Card>
            
            <Card padding={3} radius={2} shadow={1}>
              <Stack space={2}>
                <Text size={1} muted>GMB Score</Text>
                <Text size={3} weight="semibold">{score.gmbScore || 0}%</Text>
              </Stack>
            </Card>
            
            <Card padding={3} radius={2} shadow={1}>
              <Stack space={2}>
                <Text size={1} muted>Rankings Score</Text>
                <Text size={3} weight="semibold">{score.rankingsScore || 0}%</Text>
              </Stack>
            </Card>
            
            <Card padding={3} radius={2} shadow={1}>
              <Stack space={2}>
                <Text size={1} muted>Citations Score</Text>
                <Text size={3} weight="semibold">{score.citationsScore || 0}%</Text>
              </Stack>
            </Card>
            
            <Card padding={3} radius={2} shadow={1}>
              <Stack space={2}>
                <Text size={1} muted>Reviews Score</Text>
                <Text size={3} weight="semibold">{score.reviewsScore || 0}%</Text>
              </Stack>
            </Card>
          </Flex>
        </Stack>
      </Card>

      {/* Local Rankings */}
      {rankings.length > 0 && (
        <Card padding={4}>
          <Stack space={3}>
            <Flex align="center" gap={2}>
              <BarChart3 size={20} />
              <Heading size={2}>Local Rankings</Heading>
            </Flex>
            
            <Stack space={2}>
              {rankings.slice(0, 5).map((ranking: any, index: number) => (
                <Card key={index} padding={3} radius={2} shadow={1}>
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Text size={2} weight="semibold">{ranking.keyword}</Text>
                      <Text size={1} muted>Search Volume: {ranking.searchVolume?.toLocaleString()}</Text>
                    </Box>
                    <Flex align="center" gap={2}>
                      <Badge tone={ranking.position <= 3 ? 'positive' : ranking.position <= 10 ? 'caution' : 'critical'}>
                        Position {ranking.position}
                      </Badge>
                      {ranking.change !== 0 && (
                        <Badge tone={ranking.change > 0 ? 'positive' : 'critical'}>
                          {ranking.change > 0 ? '+' : ''}{ranking.change}
                        </Badge>
                      )}
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Card>
      )}

      {/* Local Competitors */}
      {competitors.length > 0 && (
        <Card padding={4}>
          <Stack space={3}>
            <Flex align="center" gap={2}>
              <Users size={20} />
              <Heading size={2}>Local Competitors</Heading>
            </Flex>
            
            <Stack space={2}>
              {competitors.slice(0, 5).map((competitor: any, index: number) => (
                <Card key={index} padding={3} radius={2} shadow={1}>
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Text size={2} weight="semibold">{competitor.name}</Text>
                      <Text size={1} muted>{competitor.distance} miles away</Text>
                    </Box>
                    <Flex align="center" gap={2}>
                      <Badge tone="primary">
                        {competitor.rating}/5
                      </Badge>
                      <Text size={1} muted>{competitor.reviews} reviews</Text>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Card>
      )}

      {/* Recommendations */}
      {(recommendations.immediate?.length > 0 || recommendations.longTerm?.length > 0) && (
        <Card padding={4}>
          <Stack space={3}>
            <Flex align="center" gap={2}>
              <AlertTriangle size={20} />
              <Heading size={2}>Recommendations</Heading>
            </Flex>
            
            {recommendations.immediate?.length > 0 && (
              <Box>
                <Text size={2} weight="semibold" style={{marginBottom: '8px'}}>Immediate Actions</Text>
                <Stack space={2}>
                  {recommendations.immediate.map((rec: string, index: number) => (
                    <Card key={index} padding={2} radius={2} tone="caution">
                      <Text size={1}>• {rec}</Text>
                    </Card>
                  ))}
                </Stack>
              </Box>
            )}
            
            {recommendations.longTerm?.length > 0 && (
              <Box>
                <Text size={2} weight="semibold" style={{marginBottom: '8px'}}>Long-term Actions</Text>
                <Stack space={2}>
                  {recommendations.longTerm.map((rec: string, index: number) => (
                    <Card key={index} padding={2} radius={2} tone="primary">
                      <Text size={1}>• {rec}</Text>
                    </Card>
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        </Card>
      )}

      {/* Action Buttons */}
      <Card padding={4}>
        <Flex gap={3} wrap="wrap">
          <Button mode="ghost" tone="primary">
            Update GMB Data
          </Button>
          <Button mode="ghost" tone="primary">
            Refresh Rankings
          </Button>
          <Button mode="ghost" tone="primary">
            Generate Report
          </Button>
          <Button mode="ghost" tone="primary">
            Export Data
          </Button>
        </Flex>
      </Card>
    </Stack>
  )
}

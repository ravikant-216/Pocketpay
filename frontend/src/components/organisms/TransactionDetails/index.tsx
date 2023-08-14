import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import {
  CANCEL_TRANSFER,
  GENERAL,
  SET_UP_BY,
  TRANSACTION_DETAIL_CANCEL_HEADING,
  TRANSACTION_DETAIL_CANCEL_SUBHEADING,
  TRANSFER_NUMBER,
  TRANSFER_SHARE_MODAL_HEADING,
  TRANSFER_SHARE_MODAL_SUBHEADING,
  steps,
} from '../../../strings/constants'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import styled from '@emotion/styled'
import arrowUpRight from '../../../../public/assets/icons/arrowupright.svg'
import Image from '../../atoms/Image'
import theme from '../../../theme'
import TabsComponent from '../../molecules/Tabs'
import shareIcon from '../../../../public/assets/icons/sharing.svg'
import helpIcon from '../../../../public/assets/icons/help.svg'
import { KeyboardArrowDown } from '@mui/icons-material'
import VerticalStepper from '../../molecules/VerticalStepper'
import TrackingShareCard from '../../molecules/TrackingShareCard'
import CustomButton from '../../atoms/Button'
import TransferCancelationModal from '../TransferCancelationModal'

export interface TransactionDetailProps {
  transactionStatus: 'Sending' | 'Cancelled'
  sendingAmount: string
  recievingAmount: string
  sendingCurrency: string
  recievingCurrency: string
  senderName: string
  receiverName: string
  transferNumber: string
  style?: React.CSSProperties
}

const TextWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
})

const CustomAccordion = styled(Accordion)({
  '&.MuiPaper-elevation': {
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.15)',
  },

  '& .MuiAccordionSummary-root': { paddingRight: '20px' },
})

const TextDetailWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const GeneralWidgetWrapper = styled(Box)({
  width: theme.spacing(29),
  height: theme.spacing(11.5),
  border: `1px solid ${theme.palette.Greys.stroke}`,
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.structuralColors.background,
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
})

const HeaderContent = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(5),
  justifyContent: 'flex-end',
  position: 'relative',
  top: theme.spacing(6.25),
  paddingRight: theme.spacing(9),
  alignItems: 'center',
})
const StyledDivider = styled(Divider)({
  flex: 1,
  padding: '0',
  margin: '0',
})

const TransactionDetails = (props: TransactionDetailProps) => {
  const [showTrackingShare, setShowTrackingShare] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)

  const [transactionStatus, setTransactionStatus] = useState(
    props.transactionStatus
  )

  const TABS = [
    {
      label: 'Updates',
      content: (
        <>
          <StyledDivider variant="middle" />
          <Box>
            <Stack
              display={'flex'}
              gap={theme.spacing(10)}
              sx={{
                paddingLeft: theme.spacing(9),
                paddingTop: theme.spacing(6),
              }}
            >
              <Box
                sx={{
                  flexDirection: 'column',
                  display: 'flex',
                  width: theme.spacing(100),
                }}
              >
                <TextDetailWrapper>
                  <Typography variant="body2" color="text.mediumEmphasis">
                    {SET_UP_BY}
                  </Typography>
                  <Typography variant="body2" color="text.highEmphasis">
                    {props.senderName} (YOU)
                  </Typography>
                </TextDetailWrapper>
                <TextDetailWrapper>
                  <Typography variant="body2" color="text.mediumEmphasis">
                    {TRANSFER_NUMBER}
                  </Typography>
                  <Typography variant="body2" color="text.highEmphasis">
                    {`#${props.transferNumber}`}
                  </Typography>
                </TextDetailWrapper>
              </Box>

              {transactionStatus === 'Cancelled' ? (
                <Box
                  display={'flex'}
                  gap={theme.spacing(5)}
                  flexDirection={'column'}
                >
                  <Typography variant="body1" color="text.highEmphasis">
                    {TRANSACTION_DETAIL_CANCEL_HEADING}
                  </Typography>
                  <Typography variant="body3" color="text.mediumEmphasis">
                    {TRANSACTION_DETAIL_CANCEL_SUBHEADING}
                  </Typography>
                </Box>
              ) : (
                <>
                  <Box
                    display={'flex'}
                    gap={theme.spacing(5)}
                    width="10%"
                    marginLeft={theme.spacing(-20)}
                  >
                    <VerticalStepper steps={steps} activeStep={3} />
                  </Box>

                  <Box
                    display={'flex'}
                    sx={{ justifyContent: 'flex-end', flex: 1 }}
                    paddingRight={theme.spacing(9)}
                  >
                    <CustomButton
                      variant="outlined"
                      onClick={() => setShowCancelModal(true)}
                      data-testid="cancelButton"
                    >
                      {CANCEL_TRANSFER}
                    </CustomButton>
                  </Box>
                </>
              )}
            </Stack>
          </Box>
        </>
      ),
    },
    { label: 'Details', content: <StyledDivider variant="middle" /> },
  ]

  return (
    <>
      <CustomAccordion
        sx={{ minWidth: theme.spacing(139.5) }}
        data-testid="transactionDetails"
        style={props.style}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ marginX: '16px' }} />}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            flexDirection={'row'}
            flex={1}
            paddingLeft={theme.spacing(9)}
            paddingBottom={theme.spacing(2.5)}
            paddingTop={theme.spacing(2.5)}
          >
            <Box display={'flex'} gap={theme.spacing(3)}>
              <Image
                src={arrowUpRight}
                alt="arrowUpIcon"
                style={{
                  borderRadius: theme.spacing(12.75),
                  backgroundColor: theme.palette.structuralColors.background,
                  padding: theme.spacing(2),
                }}
              />

              <TextWrapper>
                <Typography variant="body2" color="text.highEmphasis">
                  {props.receiverName}
                </Typography>
                <Typography variant="caption" color="text.mediumEmphasis">
                  {transactionStatus}
                </Typography>
              </TextWrapper>
            </Box>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'flex-end'}
            >
              <Typography variant="caption" color="text.highEmphasis">
                {props.sendingAmount} {props.sendingCurrency}
              </Typography>
              <Typography variant="caption" color="text.mediumEmphasis">
                {props.recievingAmount} {props.recievingCurrency}
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0, height: theme.spacing(114) }}>
          <StyledDivider variant="middle" />
          <HeaderContent>
            <GeneralWidgetWrapper>
              <Typography variant="body2" color="text.highEmphasis">
                {GENERAL}
              </Typography>
              <KeyboardArrowDown />
            </GeneralWidgetWrapper>
            <Image
              src={shareIcon}
              alt="shareIcon"
              onClick={() => setShowTrackingShare(true)}
              data-testid="shareIcon"
            />
            <Image src={helpIcon} alt="helpIcon" />
          </HeaderContent>

          <TabsComponent
            tabs={TABS}
            sx={{ '& .MuiTabs-flexContainer': { paddingLeft: '30px' } }}
          />
        </AccordionDetails>
      </CustomAccordion>
      <TrackingShareCard
        data-testid="trackingShareModal"
        open={showTrackingShare}
        onClickEmail={() => setShowTrackingShare(false)}
        onClickShare={() => setShowTrackingShare(false)}
        heading={TRANSFER_SHARE_MODAL_HEADING}
        subHeading={TRANSFER_SHARE_MODAL_SUBHEADING}
        onClose={() => setShowTrackingShare(false)}
      />
      <TransferCancelationModal
        data-testid="transferCancelationModal"
        transferNumber={props.transferNumber}
        onCancel={() => {
          setTransactionStatus('Cancelled')
          setShowCancelModal(false)
        }}
        open={showCancelModal}
      />
    </>
  )
}

export default TransactionDetails

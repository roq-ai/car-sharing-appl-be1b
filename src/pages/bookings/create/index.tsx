import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createBooking } from 'apiSdk/bookings';
import { bookingValidationSchema } from 'validationSchema/bookings';
import { CarInterface } from 'interfaces/car';
import { UserInterface } from 'interfaces/user';
import { getCars } from 'apiSdk/cars';
import { getUsers } from 'apiSdk/users';
import { BookingInterface } from 'interfaces/booking';

function BookingCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BookingInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBooking(values);
      resetForm();
      router.push('/bookings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BookingInterface>({
    initialValues: {
      start_time: new Date(new Date().toDateString()),
      end_time: new Date(new Date().toDateString()),
      pickup_location: '',
      dropoff_location: '',
      car_id: (router.query.car_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: bookingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Bookings',
              link: '/bookings',
            },
            {
              label: 'Create Booking',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Booking
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="start_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Start Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.start_time ? new Date(formik.values?.start_time) : null}
              onChange={(value: Date) => formik.setFieldValue('start_time', value)}
            />
          </FormControl>
          <FormControl id="end_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              End Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.end_time ? new Date(formik.values?.end_time) : null}
              onChange={(value: Date) => formik.setFieldValue('end_time', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.pickup_location}
            label={'Pickup Location'}
            props={{
              name: 'pickup_location',
              placeholder: 'Pickup Location',
              value: formik.values?.pickup_location,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.dropoff_location}
            label={'Dropoff Location'}
            props={{
              name: 'dropoff_location',
              placeholder: 'Dropoff Location',
              value: formik.values?.dropoff_location,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<CarInterface>
            formik={formik}
            name={'car_id'}
            label={'Select Car'}
            placeholder={'Select Car'}
            fetcher={getCars}
            labelField={'make'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/bookings')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'booking',
    operation: AccessOperationEnum.CREATE,
  }),
)(BookingCreatePage);

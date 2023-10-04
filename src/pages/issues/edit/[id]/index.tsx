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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getIssueById, updateIssueById } from 'apiSdk/issues';
import { issueValidationSchema } from 'validationSchema/issues';
import { IssueInterface } from 'interfaces/issue';
import { BookingInterface } from 'interfaces/booking';
import { UserInterface } from 'interfaces/user';
import { getBookings } from 'apiSdk/bookings';
import { getUsers } from 'apiSdk/users';

function IssueEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<IssueInterface>(
    () => (id ? `/issues/${id}` : null),
    () => getIssueById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: IssueInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateIssueById(id, values);
      mutate(updated);
      resetForm();
      router.push('/issues');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<IssueInterface>({
    initialValues: data,
    validationSchema: issueValidationSchema,
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
              label: 'Issues',
              link: '/issues',
            },
            {
              label: 'Update Issue',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Issue
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.issue_type}
            label={'Issue Type'}
            props={{
              name: 'issue_type',
              placeholder: 'Issue Type',
              value: formik.values?.issue_type,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.status}
            label={'Status'}
            props={{
              name: 'status',
              placeholder: 'Status',
              value: formik.values?.status,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="reported_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Reported Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.reported_time ? new Date(formik.values?.reported_time) : null}
              onChange={(value: Date) => formik.setFieldValue('reported_time', value)}
            />
          </FormControl>
          <FormControl id="resolved_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Resolved Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.resolved_time ? new Date(formik.values?.resolved_time) : null}
              onChange={(value: Date) => formik.setFieldValue('resolved_time', value)}
            />
          </FormControl>
          <AsyncSelect<BookingInterface>
            formik={formik}
            name={'booking_id'}
            label={'Select Booking'}
            placeholder={'Select Booking'}
            fetcher={getBookings}
            labelField={'pickup_location'}
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
              onClick={() => router.push('/issues')}
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
    entity: 'issue',
    operation: AccessOperationEnum.UPDATE,
  }),
)(IssueEditPage);

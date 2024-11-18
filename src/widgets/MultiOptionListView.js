import React from 'react';
import { View, FlatList } from 'react-native';
import AppUtils from '../utils/AppUtils';
import NoDataFoundView from './NoDataFoundView';
import RowPropertyListItem from './listitem/RowPropertyListItem';
import ActivityIndicatorView from './ActivityIndicatorView';

export default MultiOptionListView = (props) => {

    const { loading, data, visible = true, noDataText,navigation } = props;

    if (visible) {
        if (loading) {
            return <ActivityIndicatorView loading={loading} />
        } else {
            return <View style={{ flex: 1 }}>
                {
                    AppUtils.isEmpty(data)
                        ? loading ? null : <NoDataFoundView text={noDataText}/> :
                        <FlatList
                            showsVerticalScrollIndicator = {false}
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(item) => {
                                return <RowPropertyListItem item={item.item} 
                                        navigation={navigation} />
                            }}
                        />
                }

            </View>
        }
    }
    return null;

};
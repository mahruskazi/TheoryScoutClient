import { connect } from 'react-redux';
import DataInputScreen from '../../components/DataInputScreen'

const mapDispatchToProps = dispatch => ({
    addMatch: data => {
        dispatch({type: 'ADD_MATCH', payload: data});
    }
});

export default connect(null, mapDispatchToProps)(DataInputScreen);
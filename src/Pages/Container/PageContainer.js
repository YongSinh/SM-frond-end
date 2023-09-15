
import "./PageContainer.css"
import { Button, Input, Spin, DatePicker } from "antd"
import {isEmptyOrNull} from '../../util/service'

const PageContainer = ({
    pageTitle = "PageTitle",
    loading = false,
    btnRight = false,
    onClickBtnRight,
    children,
    onFilterDate,
    date = false,

    search={
        title:"Name",
        size:"middle",
        allowClear:true
    },
    onSearch
}) => {

    return (
        <div>
            {/* header */}
            <div className="pageHeaderContainer">
                <div className="rowHeader">
                    <div className="pageTitle">{pageTitle}</div>

                    {search != null &&
                     <div className="filterContent">
                        <Input.Search 
                            placeholder={search.title}
                            size={search.size}
                            onSearch={onSearch}
                            allowClear={search.allowClear}
                        />
                    </div>
                    }

                    {!isEmptyOrNull(date) && 
                    <div className="date">
                        <DatePicker  picker="month" onChange={onFilterDate} />
                    </div>
                    }
                    
                </div>
                <div>
                    {!isEmptyOrNull(btnRight) && 
                        <Button  type="primary" onClick={onClickBtnRight}>{btnRight}</Button>
                    }
                </div>
            </div>
            {/* body */}
            <Spin spinning={loading}>
                {children}
            </Spin>
        </div>
    )
}

export default PageContainer
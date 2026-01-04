import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { fetchMarketChart } from '@/state/coin/Action';
import {useEffect, useState} from 'react'
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';

const timeSeries = [
    {
        keyword: "DIGITAL_CURRENCY_DAILY",
        key: "Time Series (Daily)",
        lable: "1 Day",
        value: 1
    },
    {
        keyword: "DIGITAL_CURRENCY_WEEKLY",
        key: "Time Series (Weekly)",
        lable: "1 Week",
        value: 7
    },
    {
        keyword: "DIGITAL_CURRENCY_MONTHLY",
        key: "Time Series (Monthly)",
        lable: "1 Month",
        value: 30
    },
    {
        keyword: "DIGITAL_CURRENCY_YEARLY",
        key: "Time Series (Yearly)",
        lable: "1 Year",
        value: 365
    }
]

const StockChart = ({coinId}) => {

    const dispatch = useDispatch();
    const {coin} = useSelector(store => store);
    const [activeLable, setActiveLable] = useState(timeSeries[0]);

    useEffect(() => {
        dispatch(fetchMarketChart({coinId, days: activeLable.value, jwt: localStorage.getItem('jwt')}));
    }, [dispatch, coinId, activeLable.value]);

    if (coin.marketChart.loading) {
        return (
            <div className="flex justify-center items-center h-[483px]">
            <Button disabled variant="outline" className="flex gap-2">
                <Spinner />
                <span>Loading chart...</span>
            </Button>
            </div>
        )
    }

    const series = [
        {
            data: coin.marketChart.data
        }
    ];

    const options = {
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
            zoom: {
                autoScaleYaxis: true
            },
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'datetime',
            tickAmount: 6
        },
        colors: ['#758AA2'],
        markers: {
            colors:["#fff"],
            strokeColors: "#fff",
            size: 0,
            strokeWidth: 1,
            style: 'hollow'
        },
        tooltip: {
            theme: 'dark',
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.8,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
        grid: {
            borderColor: '#47535E',
            strokeDashArray: 4,
            show: true
        }
    }; 

    const handleActiveChange = (value) => {
        setActiveLable(value);
    }

    return (
        <div>
            <div className='space-x-3'>
                {timeSeries.map((item) => <Button key = {item.lable}
                    variant={activeLable.lable == item.lable ? '' : 'outline'}
                    onClick={() => handleActiveChange(item)}
                    className=' cursor-pointer'
                    >
                    {item.lable}
                </Button>)}
            </div>
            <div id='chart-timelines' className='flex-1 min-h-0 h-full'>
                <ReactApexChart options={options} series={series} type='area' height={483}/>
            </div>
        </div>
    )
}

export default StockChart